import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'candidate.dart';

class CandidatesNotifier extends Notifier<List<Candidate>> {
  @override
  List<Candidate> build() => List<Candidate>.from(seedCandidates);

  Candidate? findById(String id) {
    for (final candidate in state) {
      if (candidate.id == id) {
        return candidate;
      }
    }
    return null;
  }

  void add(Candidate candidate) {
    state = [...state, candidate];
  }

  void update(Candidate candidate) {
    state = [
      for (final item in state)
        if (item.id == candidate.id) candidate else item,
    ];
  }

  void endCurrentWork(String candidateId) {
    final existing = findById(candidateId);
    if (existing == null) {
      return;
    }
    final now = DateTime.now();
    update(
      existing.copyWith(
        workHistory: [
          for (final entry in existing.workHistory)
            if (entry.isCurrent) entry.copyWith(endDate: now) else entry,
        ],
      ),
    );
  }

  void startCurrentWork(
    String candidateId, {
    String? companyId,
    String? companyName,
    String? trade,
  }) {
    final existing = findById(candidateId);
    if (existing == null || existing.isCurrentlyWorking) {
      return;
    }
    final entry = WorkEntry(
      id: DateTime.now().millisecondsSinceEpoch.toString(),
      companyId: companyId,
      companyName: companyName,
      trade: trade,
      startDate: DateTime.now(),
    );
    update(
      existing.copyWith(
        workHistory: [...existing.workHistory, entry],
      ),
    );
  }
}

final candidatesProvider =
    NotifierProvider<CandidatesNotifier, List<Candidate>>(CandidatesNotifier.new);
