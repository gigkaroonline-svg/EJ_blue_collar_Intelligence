import { Request, Response } from 'express';
import { AppError } from '../middleware/asyncHandler';
import {
  assertAllowedContentType,
  buildPartnerObjectKey,
  createReadSignedUrl,
  createUploadSignedUrl,
  extensionForContentType,
  isOurObjectKey,
} from '../services/gcs';

const KINDS = new Set(['id-front', 'id-back', 'pan', 'photo', 'avatar']);

export async function createSignedUploadUrl(req: Request, res: Response) {
  const contentType = assertAllowedContentType(String(req.body?.contentType ?? ''));
  const kind = String(req.body?.kind ?? '').trim();
  if (!KINDS.has(kind)) {
    throw new AppError(
      400,
      'kind must be one of: id-front, id-back, pan, photo, avatar',
      'invalid_kind',
    );
  }

  const partnerId = req.partner!.id;
  const ext = extensionForContentType(contentType);
  const objectKey = buildPartnerObjectKey(partnerId, kind, ext);

  const signed = await createUploadSignedUrl({ objectKey, contentType });
  res.json({
    uploadUrl: signed.uploadUrl,
    objectKey: signed.objectKey,
    bucket: signed.bucket,
    headers: { 'Content-Type': contentType },
  });
}

export async function createSignedReadUrl(req: Request, res: Response) {
  const objectKey = String(req.body?.objectKey ?? '').trim();
  if (!isOurObjectKey(objectKey)) {
    throw new AppError(400, 'Invalid object key', 'invalid_object_key');
  }
  const signed = await createReadSignedUrl({ objectKey });
  res.json(signed);
}
