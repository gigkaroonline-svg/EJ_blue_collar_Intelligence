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

  Future<void> signup(Map<String, dynamic> body) async {
    try {
      await _dio.post<Map<String, dynamic>>('/auth/signup', data: body);
    } on DioException catch (e) {
      _throwApiError(e);
    }
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
      return _tokenFrom(response.data);
    } on DioException catch (e) {
      _throwApiError(e);
    }
  }

  Future<String> loginWithPassword({
    required String phoneNumber,
    required String password,
  }) async {
    try {
      final response = await _dio.post<Map<String, dynamic>>(
        '/auth/login',
        data: {
          'phoneNumber': phoneNumber,
          'password': password,
        },
      );
      return _tokenFrom(response.data);
    } on DioException catch (e) {
      _throwApiError(e);
    }
  }

  String _tokenFrom(Map<String, dynamic>? data) {
    final token = data?['token'];
    if (token is! String || token.isEmpty) {
      throw const ApiError(code: 'server_error', error: 'Something went wrong');
    }
    return token;
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
