import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/errors/api_error.dart';
import '../../../core/network/api_client.dart';
import '../models/partner.dart';

class AuthRepository {
  AuthRepository(this._dio);

  final Dio _dio;

  Never _throwApiError(DioException e) {
    final err = e.error;
    if (err is ApiError) throw err;
    throw ApiError.fromDioException(e);
  }

  Future<void> requestOtp({
    required String phoneNumber,
    required String purpose,
  }) async {
    try {
      await _dio.post<Map<String, dynamic>>(
        '/auth/request-otp',
        data: {'phoneNumber': phoneNumber, 'purpose': purpose},
      );
    } on DioException catch (e) {
      _throwApiError(e);
    }
  }

  Future<String> verifyOtp({
    required String phoneNumber,
    required String otp,
    required String purpose,
  }) async {
    try {
      final response = await _dio.post<Map<String, dynamic>>(
        '/auth/verify-otp',
        data: {
          'phoneNumber': phoneNumber,
          'otp': otp,
          'purpose': purpose,
        },
      );
      final token = response.data?['token'];
      if (token is! String || token.isEmpty) {
        throw const ApiError(code: 'server_error', error: 'Something went wrong');
      }
      return token;
    } on DioException catch (e) {
      _throwApiError(e);
    }
  }

  Future<Partner> fetchMe() async {
    try {
      final response = await _dio.get<Map<String, dynamic>>('/auth/me');
      final data = response.data;
      if (data == null) {
        throw const ApiError(code: 'server_error', error: 'Something went wrong');
      }
      return Partner.fromJson(data);
    } on DioException catch (e) {
      _throwApiError(e);
    }
  }
}

final authRepositoryProvider = Provider<AuthRepository>((ref) {
  return AuthRepository(ref.watch(dioProvider));
});
