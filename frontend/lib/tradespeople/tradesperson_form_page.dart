import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import 'package:frontend/l10n/app_localizations.dart';
import '../core/errors/api_error.dart';
import '../features/catalog/models/catalog_skill.dart';
import '../features/catalog/presentation/skill_search_field.dart';
import '../theme/app_styles.dart';
import 'add_work_sheet.dart';
import 'address_fields.dart';
import 'availability_chip.dart';
import 'tradesperson.dart';
import 'tradespeople_provider.dart';
import 'document_ui.dart';
import 'work_history_tile.dart';

class TradespersonFormPage extends ConsumerStatefulWidget {
  const TradespersonFormPage({super.key, this.tradespersonId});

  final String? tradespersonId;

  bool get isEditing => tradespersonId != null;

  @override
  ConsumerState<TradespersonFormPage> createState() => _TradespersonFormPageState();
}

class _TradespersonFormPageState extends ConsumerState<TradespersonFormPage>
    with SingleTickerProviderStateMixin {
  static const _idTypes = ['aadhaar', 'voter_id', 'pan'];

  final _formKey = GlobalKey<FormState>();
  late final TabController _tabController;

  late final TextEditingController _fullName;
  late final TextEditingController _phone;
  late final TextEditingController _gender;
  late final TextEditingController _dateOfBirth;
  late final TextEditingController _idNumber;
  late final TextEditingController _subSkills;
  late final TextEditingController _years;
  late final TextEditingController _wage;
  late final AddressControllers _permanentAddress;
  late final AddressControllers _currentAddress;

  String _idType = _idTypes.first;
  CatalogSkill? _primaryTrade;
  bool _sameAsPermanent = false;
  bool _missingTradesperson = false;
  bool _saving = false;
  late List<TradespersonDocument> _documents;
  late List<WorkEntry> _workHistory;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
    _tabController.addListener(() {
      if (!_tabController.indexIsChanging) {
        setState(() {});
      }
    });

    final existing = widget.tradespersonId == null
        ? null
        : ref.read(tradespeopleProvider.notifier).findById(widget.tradespersonId!);

    if (widget.isEditing && existing == null) {
      _missingTradesperson = true;
    }

    final personal = existing?.personal;
    final experience = existing?.experience;

    _fullName = TextEditingController(text: personal?.fullName ?? '');
    _phone = TextEditingController(text: personal?.phoneNumber ?? '');
    _gender = TextEditingController(text: personal?.gender ?? '');
    _dateOfBirth = TextEditingController(text: personal?.dateOfBirth ?? '');
    _idNumber = TextEditingController();
    _subSkills = TextEditingController(
      text: experience?.subSkills.join(', ') ?? '',
    );
    _years = TextEditingController(
      text: experience?.yearsOfExperience.toString() ?? '',
    );
    _wage = TextEditingController(
      text: experience?.dailyWageExpected.toString() ?? '',
    );
    _permanentAddress = AddressControllers(initial: personal?.permanentAddress);
    _currentAddress = AddressControllers(initial: personal?.currentAddress);
    _sameAsPermanent = personal != null &&
        personal.permanentAddress.isSameAs(personal.currentAddress);
    _documents = List<TradespersonDocument>.from(existing?.documents ?? const []);
    _workHistory = List<WorkEntry>.from(existing?.workHistory ?? const []);

    if (existing?.primaryTradeId != null &&
        existing!.experience.primaryTrade.isNotEmpty &&
        existing.experience.primaryTrade != '—') {
      _primaryTrade = CatalogSkill(
        id: existing.primaryTradeId!,
        name: existing.experience.primaryTrade,
      );
    }
    if (existing?.idType != null && _idTypes.contains(existing!.idType)) {
      _idType = existing.idType!;
    }
  }

  @override
  void dispose() {
    _tabController.dispose();
    _fullName.dispose();
    _phone.dispose();
    _gender.dispose();
    _dateOfBirth.dispose();
    _idNumber.dispose();
    _subSkills.dispose();
    _years.dispose();
    _wage.dispose();
    _permanentAddress.dispose();
    _currentAddress.dispose();
    super.dispose();
  }

  String? _required(String? value, AppLocalizations l10n) {
    if (value == null || value.trim().isEmpty) {
      return l10n.requiredField;
    }
    return null;
  }

  void _onSameAsPermanentChanged(bool? value) {
    final checked = value ?? false;
    setState(() {
      _sameAsPermanent = checked;
      if (checked) {
        _currentAddress.copyFrom(_permanentAddress);
      }
    });
  }

  Future<void> _pickDocumentType() async {
    final l10n = AppLocalizations.of(context)!;
    final selected = await showModalBottomSheet<DocumentType>(
      context: context,
      builder: (context) {
        return SafeArea(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              for (final type in DocumentType.values)
                ListTile(
                  leading: Icon(documentTypeIcon(type)),
                  title: Text(documentTypeLabel(l10n, type)),
                  onTap: () => Navigator.pop(context, type),
                ),
            ],
          ),
        );
      },
    );

    if (selected == null || !mounted) return;

    // Document upload API is not wired yet; keep a local placeholder.
    setState(() {
      _documents = [
        ..._documents,
        TradespersonDocument(type: selected, imagePath: 'placeholder'),
      ];
    });
  }

  Future<void> _addWork() async {
    final entry = await showAddWorkSheet(context);
    if (entry == null || !mounted) return;
    setState(() {
      _workHistory = [..._workHistory, entry];
    });
  }

  void _endWork(String entryId) {
    setState(() {
      _workHistory = [
        for (final entry in _workHistory)
          if (entry.id == entryId)
            entry.copyWith(endDate: DateTime.now())
          else
            entry,
      ];
    });
  }

  bool get _isCurrentlyWorking {
    for (final entry in _workHistory) {
      if (entry.isCurrent) return true;
    }
    return false;
  }

  List<WorkEntry> get _sortedWorkHistory {
    final entries = List<WorkEntry>.from(_workHistory);
    entries.sort((a, b) {
      if (a.isCurrent != b.isCurrent) {
        return a.isCurrent ? -1 : 1;
      }
      return b.startDate.compareTo(a.startDate);
    });
    return entries;
  }

  String? _dobToIso(String raw) {
    final text = raw.trim();
    final parts = text.split(RegExp(r'[/\-.]'));
    if (parts.length == 3) {
      final d = int.tryParse(parts[0]);
      final m = int.tryParse(parts[1]);
      final y = int.tryParse(parts[2]);
      if (d != null && m != null && y != null) {
        return DateTime(y, m, d).toIso8601String();
      }
    }
    return DateTime.tryParse(text)?.toIso8601String();
  }

  Future<void> _save() async {
    if (!_formKey.currentState!.validate()) return;

    if (widget.isEditing) {
      ScaffoldMessenger.of(context)
        ..hideCurrentSnackBar()
        ..showSnackBar(
          const SnackBar(content: Text('Editing is not available yet')),
        );
      return;
    }

    if (_primaryTrade == null) {
      ScaffoldMessenger.of(context)
        ..hideCurrentSnackBar()
        ..showSnackBar(const SnackBar(content: Text('Select a primary trade')));
      return;
    }

    if (_sameAsPermanent) {
      _currentAddress.copyFrom(_permanentAddress);
    }

    final years = int.tryParse(_years.text.trim()) ?? 0;
    final wage = int.tryParse(_wage.text.trim()) ?? 0;
    final permanent = _permanentAddress.toAddress();
    final present = _currentAddress.toAddress();

    final body = <String, dynamic>{
      'idType': _idType,
      'idNumber': _idNumber.text.trim(),
      'fullName': _fullName.text.trim(),
      'gender': _gender.text.trim(),
      'phoneNumber': _phone.text.trim(),
      'dateOfBirth': _dobToIso(_dateOfBirth.text),
      'permanentAddress': permanent.toApiJson(),
      'presentSameAsPermanent': _sameAsPermanent,
      if (!_sameAsPermanent) 'presentAddress': present.toApiJson(),
      'dailyWageExpected': wage,
      'primaryTrade': _primaryTrade!.id,
      'skillIds': [_primaryTrade!.id],
      'workExperiences': [
        for (final entry in _workHistory)
          if (entry.companyId != null && entry.companyId!.isNotEmpty)
            {
              'companyId': entry.companyId,
              'yearsOfExperience': entry.yearsOfExperience ?? years,
            },
      ],
    };

    setState(() => _saving = true);
    try {
      final created = await ref.read(tradespeopleProvider.notifier).create(body);
      if (!mounted) return;
      context.go('/tradesperson/${created.id}');
    } catch (e) {
      if (!mounted) return;
      final message = e is ApiError ? e.error : e.toString();
      ScaffoldMessenger.of(context)
        ..hideCurrentSnackBar()
        ..showSnackBar(SnackBar(content: Text(message)));
    } finally {
      if (mounted) setState(() => _saving = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;
    if (_missingTradesperson) {
      return Scaffold(
        appBar: AppBar(title: Text(l10n.editTradesperson)),
        body: Center(child: Text(l10n.tradespersonNotFound)),
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: Text(
          widget.isEditing ? l10n.editTradesperson : l10n.addTradesperson,
        ),
        bottom: TabBar(
          controller: _tabController,
          tabs: [
            Tab(text: l10n.personal),
            Tab(text: l10n.documents),
            Tab(text: l10n.experience),
          ],
        ),
      ),
      body: Form(
        key: _formKey,
        child: Column(
          children: [
            Expanded(
              child: IndexedStack(
                index: _tabController.index,
                children: [
                  _buildPersonalTab(l10n),
                  _buildDocumentsTab(l10n),
                  _buildExperienceTab(l10n),
                ],
              ),
            ),
            SafeArea(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(20, 8, 20, 16),
                child: FilledButton(
                  onPressed: _saving ? null : _save,
                  child: _saving
                      ? const SizedBox(
                          width: 20,
                          height: 20,
                          child: CircularProgressIndicator(strokeWidth: 2),
                        )
                      : Text(l10n.saveTradesperson),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPersonalTab(AppLocalizations l10n) {
    final textTheme = Theme.of(context).textTheme;

    return ListView(
      padding: AppStyles.detailPadding,
      children: [
        TextFormField(
          controller: _fullName,
          textCapitalization: TextCapitalization.words,
          decoration: InputDecoration(labelText: l10n.fullName),
          validator: (value) => _required(value, l10n),
        ),
        const SizedBox(height: 12),
        TextFormField(
          controller: _phone,
          keyboardType: TextInputType.phone,
          inputFormatters: [
            FilteringTextInputFormatter.digitsOnly,
            LengthLimitingTextInputFormatter(10),
          ],
          decoration: InputDecoration(labelText: l10n.mobileNumber),
          validator: (value) => _required(value, l10n),
        ),
        const SizedBox(height: 12),
        TextFormField(
          controller: _gender,
          decoration: InputDecoration(labelText: l10n.gender),
          validator: (value) => _required(value, l10n),
        ),
        const SizedBox(height: 12),
        TextFormField(
          controller: _dateOfBirth,
          decoration: InputDecoration(
            labelText: l10n.dateOfBirth,
            hintText: 'DD/MM/YYYY',
          ),
          validator: (value) => _required(value, l10n),
        ),
        if (!widget.isEditing) ...[
          const SizedBox(height: 12),
          DropdownButtonFormField<String>(
            initialValue: _idType,
            decoration: const InputDecoration(labelText: 'ID type'),
            items: [
              for (final type in _idTypes)
                DropdownMenuItem(value: type, child: Text(type)),
            ],
            onChanged: (value) {
              if (value != null) setState(() => _idType = value);
            },
          ),
          const SizedBox(height: 12),
          TextFormField(
            controller: _idNumber,
            decoration: const InputDecoration(labelText: 'ID number'),
            validator: (value) => _required(value, l10n),
          ),
        ],
        const SizedBox(height: 16),
        Text(l10n.permanentAddress, style: textTheme.titleMedium),
        const SizedBox(height: 12),
        AddressFields(
          controllers: _permanentAddress,
          enabled: true,
          validator: (value) => _required(value, l10n),
        ),
        const SizedBox(height: 20),
        Text(l10n.currentAddress, style: textTheme.titleMedium),
        CheckboxListTile(
          contentPadding: EdgeInsets.zero,
          controlAffinity: ListTileControlAffinity.leading,
          title: Text(l10n.sameAsPermanent),
          value: _sameAsPermanent,
          onChanged: _onSameAsPermanentChanged,
        ),
        AddressFields(
          controllers: _currentAddress,
          enabled: !_sameAsPermanent,
          validator: (value) => _required(value, l10n),
        ),
      ],
    );
  }

  Widget _buildDocumentsTab(AppLocalizations l10n) {
    final muted = Theme.of(context).colorScheme.onSurfaceVariant;

    return ListView(
      padding: AppStyles.detailPadding,
      children: [
        if (_documents.isEmpty)
          Padding(
            padding: const EdgeInsets.only(bottom: 16),
            child: Text(l10n.noDocuments),
          ),
        for (final doc in _documents) ...[
          Card(
            child: ListTile(
              leading: Icon(documentTypeIcon(doc.type)),
              title: Text(documentTypeLabel(l10n, doc.type)),
              trailing: doc.imagePath == null
                  ? null
                  : Container(
                      width: 40,
                      height: 40,
                      decoration: BoxDecoration(
                        color: muted.withValues(alpha: 0.12),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Icon(Icons.image_outlined, color: muted),
                    ),
            ),
          ),
          const SizedBox(height: 8),
        ],
        const SizedBox(height: 8),
        SizedBox(
          height: 56,
          child: OutlinedButton.icon(
            onPressed: _pickDocumentType,
            icon: const Icon(Icons.add),
            label: Text(l10n.addDocument),
          ),
        ),
      ],
    );
  }

  Widget _buildExperienceTab(AppLocalizations l10n) {
    final textTheme = Theme.of(context).textTheme;
    final history = _sortedWorkHistory;
    final muted = Theme.of(context).colorScheme.onSurfaceVariant;

    return ListView(
      padding: AppStyles.detailPadding,
      children: [
        AvailabilityChip(isAvailable: !_isCurrentlyWorking),
        const SizedBox(height: 8),
        Text(
          l10n.availabilityHint,
          style: textTheme.bodySmall?.copyWith(color: muted),
        ),
        const SizedBox(height: 16),
        SkillSearchField(
          initial: _primaryTrade,
          onSelected: (skill) => setState(() => _primaryTrade = skill),
        ),
        const SizedBox(height: 12),
        TextFormField(
          controller: _subSkills,
          decoration: InputDecoration(
            labelText: l10n.subSkills,
            hintText: l10n.subSkillsHint,
          ),
        ),
        const SizedBox(height: 12),
        TextFormField(
          controller: _years,
          keyboardType: TextInputType.number,
          inputFormatters: [FilteringTextInputFormatter.digitsOnly],
          decoration: InputDecoration(
            labelText: l10n.yearsOfExperience,
          ),
          validator: (value) => _required(value, l10n),
        ),
        const SizedBox(height: 12),
        TextFormField(
          controller: _wage,
          keyboardType: TextInputType.number,
          inputFormatters: [FilteringTextInputFormatter.digitsOnly],
          decoration: InputDecoration(
            labelText: l10n.dailyWageExpected,
          ),
          validator: (value) => _required(value, l10n),
        ),
        const SizedBox(height: 20),
        Text(l10n.workHistory, style: textTheme.titleMedium),
        const SizedBox(height: 8),
        if (history.isEmpty)
          Padding(
            padding: const EdgeInsets.only(bottom: 12),
            child: Text(l10n.noWorkHistory),
          )
        else
          for (final entry in history) ...[
            WorkHistoryTile(
              entry: entry,
              onEndCurrent: entry.isCurrent ? () => _endWork(entry.id) : null,
            ),
            const SizedBox(height: 8),
          ],
        SizedBox(
          height: 56,
          child: OutlinedButton.icon(
            onPressed: _addWork,
            icon: const Icon(Icons.add),
            label: Text(l10n.addWork),
          ),
        ),
      ],
    );
  }
}
