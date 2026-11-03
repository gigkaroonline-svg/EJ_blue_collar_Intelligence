import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/errors/api_error.dart';
import '../../../core/network/api_client.dart';
import '../models/partner.dart';

final partnerProfileProvider = FutureProvider.autoDispose<Partner>((ref) async {
  final dio = ref.watch(dioProvider);
  try {
    final response = await dio.get<Map<String, dynamic>>('/auth/me');
    final data = response.data;
    if (data == null) {
      throw const ApiError(code: 'server_error', error: 'Something went wrong');
    }
    return Partner.fromJson(data);
  } on DioException catch (e) {
    throw e.error is ApiError
        ? e.error as ApiError
        : ApiError.fromDioException(e);
  }
});
