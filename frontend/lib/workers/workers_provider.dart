import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../features/tradespeople/data/tradespeople_repository.dart';
import 'tradesperson.dart';

class TradespeopleNotifier extends AsyncNotifier<List<Tradesperson>> {
  TradespeopleRepository get _repo => ref.read(tradespeopleRepositoryProvider);

  @override
  Future<List<Tradesperson>> build() => _repo.list();

  Future<void> refresh() async {
    state = const AsyncLoading();
    state = await AsyncValue.guard(_repo.list);
  }

  Tradesperson? findById(String id) {
    final list = state.asData?.value;
    if (list == null) return null;
    for (final item in list) {
      if (item.id == id) return item;
    }
    return null;
  }

  Future<void> setAvailability(String id, {required bool isReadyToWork}) async {
    await _repo.setAvailability(id: id, isReadyToWork: isReadyToWork);
    await refresh();
  }

  Future<Tradesperson> create(Map<String, dynamic> body) async {
    final created = await _repo.create(body);
    await refresh();
    return created;
  }
}

final tradespeopleProvider =
    AsyncNotifierProvider<TradespeopleNotifier, List<Tradesperson>>(
  TradespeopleNotifier.new,
);
