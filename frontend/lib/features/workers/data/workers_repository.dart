import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/errors/api_error.dart';
import '../../../core/network/api_client.dart';
import '../../../tradespeople/tradesperson.dart';

class TradespeopleRepository {
  TradespeopleRepository(this._dio);

  final Dio _dio;

  Never _throwApiError(DioException e) {
    final err = e.error;
    if (err is ApiError) throw err;
    throw ApiError.fromDioException(e);
  }

  Future<List<Tradesperson>> list({int limit = 50}) async {
    try {
      final response = await _dio.get<Map<String, dynamic>>(
        '/tradespeople',
        queryParameters: {'limit': limit, 'page': 1},
      );
      final items = response.data?['items'];
      if (items is! List) return const [];
      return [
        for (final item in items)
          if (item is Map) Tradesperson.fromJson(Map<String, dynamic>.from(item)),
      ];
    } on DioException catch (e) {
      _throwApiError(e);
    }
  }

  Future<Tradesperson> getById(String id) async {
    try {
      final response = await _dio.get<Map<String, dynamic>>('/tradespeople/$id');
      final data = response.data;
      if (data == null) {
        throw const ApiError(code: 'not_found', error: 'Tradesperson not found');
      }
      return Tradesperson.fromJson(data);
    } on DioException catch (e) {
      _throwApiError(e);
    }
  }

  Future<Tradesperson> setAvailability({
    required String id,
    required bool isReadyToWork,
  }) async {
    try {
      final response = await _dio.patch<Map<String, dynamic>>(
        '/tradespeople/$id/availability',
        data: {'isReadyToWork': isReadyToWork},
      );
      final data = response.data;
      if (data == null) {
        throw const ApiError(code: 'server_error', error: 'Something went wrong');
      }
      return Tradesperson.fromJson(data);
    } on DioException catch (e) {
      _throwApiError(e);
    }
  }

  Future<Tradesperson> create(Map<String, dynamic> body) async {
    try {
      final response = await _dio.post<Map<String, dynamic>>(
        '/tradespeople',
        data: body,
      );
      final data = response.data;
      if (data == null) {
        throw const ApiError(code: 'server_error', error: 'Something went wrong');
      }
      return Tradesperson.fromJson(data);
    } on DioException catch (e) {
      _throwApiError(e);
    }
  }
}

final tradespeopleRepositoryProvider = Provider<TradespeopleRepository>((ref) {
  return TradespeopleRepository(ref.watch(dioProvider));
});
