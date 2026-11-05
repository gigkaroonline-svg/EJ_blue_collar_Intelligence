import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:image_picker/image_picker.dart';

import 'package:frontend/l10n/app_localizations.dart';
import '../core/errors/api_error.dart';
import '../core/ui/date_slash_formatter.dart';
import '../features/catalog/models/catalog_job.dart';
import '../features/catalog/presentation/job_search_field.dart';
import '../features/uploads/data/uploads_repository.dart';
import '../theme/app_colors.dart';
import '../theme/app_styles.dart';
import 'add_work_sheet.dart';
import 'address_fields.dart';
import 'availability_chip.dart';
import 'tradesperson.dart';
import 'tradespeople_provider.dart';
import 'work_history_tile.dart';

class TradespersonFormPage extends ConsumerStatefulWidget {
  const TradespersonFormPage({
    super.key,
    this.tradespersonId,
    this.initialTabIndex = 0,
  });

  final String? tradespersonId;
  final int initialTabIndex;

  bool get isEditing => tradespersonId != null;

  @override
  ConsumerState<TradespersonFormPage> createState() => _TradespersonFormPageState();
}

class _TradespersonFormPageState extends ConsumerState<TradespersonFormPage>
    with SingleTickerProviderStateMixin {
  static const _idTypes = ['aadhaar', 'pan'];
  static const _genders = ['male', 'female', 'other'];

  final _formKey = GlobalKey<FormState>();
  final _dobFieldKey = GlobalKey<FormFieldState<String>>();
  final _imagePicker = ImagePicker();
  late final TabController _tabController;

  late final TextEditingController _fullName;
  late final TextEditingController _phone;
  late final TextEditingController _dateOfBirth;
  late final TextEditingController _idNumber;
  late final TextEditingController _subSkills;
  late final TextEditingController _years;
  late final TextEditingController _wage;
  late final AddressControllers _permanentAddress;
  late final AddressControllers _currentAddress;

  String? _gender;
  String? _idType;
  CatalogJob? _primaryTrade;
  String? _idFrontPath;
  String? _idBackPath;
  bool _sameAsPermanent = false;
  bool _missingTradesperson = false;
  bool _saving = false;
  late List<WorkEntry> _workHistory;

  @override
  void initState() {
    super.initState();
    final tabIndex = widget.initialTabIndex.clamp(0, 2).toInt();
    _tabController = TabController(
      length: 3,
      vsync: this,
      initialIndex: tabIndex,
    );
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
    _workHistory = List<WorkEntry>.from(existing?.workHistory ?? const []);

    final existingGender = personal?.gender.toLowerCase();
    if (existingGender != null && _genders.contains(existingGender)) {
      _gender = existingGender;
    }

    if (existing?.primaryTradeId != null &&
        existing!.experience.primaryTrade.isNotEmpty &&
        existing.experience.primaryTrade != '—') {
      _primaryTrade = CatalogJob(
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

  String _idTypeLabel(AppLocalizations l10n, String type) {
    return type == 'pan' ? l10n.pan : l10n.aadhaar;
  }

  String _genderLabel(AppLocalizations l10n, String gender) {
    switch (gender) {
      case 'female':
        return l10n.female;
      case 'other':
        return l10n.other;
      default:
        return l10n.male;
    }
  }

  /// Looks like a text field; opens a tight popup under the field (not M3's big menu card).
  Widget _formDropdown({
    required String? value,
    required String label,
    required String hint,
    required List<String> options,
    required String Function(String value) optionLabel,
    required ValueChanged<String?> onChanged,
    required AppLocalizations l10n,
  }) {
    return FormField<String>(
      initialValue: value,
      validator: (selected) => selected == null ? l10n.requiredField : null,
      builder: (field) {
        return _CompactSelectField(
          label: label,
          hint: hint,
          value: field.value,
          errorText: field.errorText,
          optionLabel: optionLabel,
          options: options,
          onChanged: (selected) {
            field.didChange(selected);
            onChanged(selected);
          },
        );
      },
    );
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

  void _onIdTypeChanged(String? value) {
    if (value == _idType) return;
    setState(() {
      _idType = value;
      _idFrontPath = null;
      _idBackPath = null;
    });
  }

  Future<void> _pickIdImage({required bool isFront}) async {
    final l10n = AppLocalizations.of(context)!;
    final source = await showModalBottomSheet<ImageSource>(
      context: context,
      builder: (context) {
        return SafeArea(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              ListTile(
                leading: const Icon(Icons.photo_camera_outlined),
                title: Text(l10n.takePhoto),
                onTap: () => Navigator.pop(context, ImageSource.camera),
              ),
              ListTile(
                leading: const Icon(Icons.photo_library_outlined),
                title: Text(l10n.chooseGallery),
                onTap: () => Navigator.pop(context, ImageSource.gallery),
              ),
            ],
          ),
        );
      },
    );
    if (source == null || !mounted) return;

    final file = await _imagePicker.pickImage(
      source: source,
      imageQuality: 85,
      maxWidth: 1600,
    );
    if (file == null || !mounted) return;

    setState(() {
      if (isFront) {
        _idFrontPath = file.path;
      } else {
        _idBackPath = file.path;
      }
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

  String? _dobToIso(String raw) => parseDobDdMmYyyy(raw);

  String? _validateDob(String? value, AppLocalizations l10n) {
    final text = value?.trim() ?? '';
    if (text.isEmpty) return l10n.requiredField;
    if (tryParseDobDdMmYyyy(text, requireMinAge: null) == null) {
      return 'Enter a valid date (DD/MM/YYYY)';
    }
    if (tryParseDobDdMmYyyy(text) == null) {
      return 'Must be at least 18 years old';
    }
    return null;
  }

  Future<void> _pickDateOfBirth() async {
    final l10n = AppLocalizations.of(context)!;
    final latestAllowed = maxDobForMinAge();
    final parsed = tryParseDobDdMmYyyy(_dateOfBirth.text);
    final initialDate = parsed ?? DateTime(latestAllowed.year - 7);

    final picked = await showDatePicker(
      context: context,
      initialDate:
          initialDate.isAfter(latestAllowed) ? latestAllowed : initialDate,
      firstDate: DateTime(1900),
      lastDate: latestAllowed,
      helpText: l10n.dateOfBirth,
    );
    if (picked == null || !mounted) return;
    setState(() {
      _dateOfBirth.text = formatDobDdMmYyyy(picked);
    });
    _dobFieldKey.currentState?.validate();
  }

  void _onDobTextChanged(String text) {
    final digits = text.replaceAll(RegExp(r'[^0-9]'), '');
    // Show age/format errors as soon as DD/MM/YYYY is complete (not only on Save).
    if (digits.length == 8 || text.isEmpty) {
      _dobFieldKey.currentState?.validate();
    }
  }

  Future<void> _save() async {
    final l10n = AppLocalizations.of(context)!;
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

    if (_idFrontPath == null || _idBackPath == null) {
      ScaffoldMessenger.of(context)
        ..hideCurrentSnackBar()
        ..showSnackBar(SnackBar(content: Text(l10n.idImagesRequired)));
      _tabController.animateTo(1);
      return;
    }

    if (_sameAsPermanent) {
      _currentAddress.copyFrom(_permanentAddress);
    }

    final years = int.tryParse(_years.text.trim()) ?? 0;
    final wage = int.tryParse(_wage.text.trim()) ?? 0;
    final permanent = _permanentAddress.toAddress();
    final present = _currentAddress.toAddress();

    setState(() => _saving = true);
    try {
      final uploads = ref.read(uploadsRepositoryProvider);
      final frontKey = await uploads.uploadImage(
        localPath: _idFrontPath!,
        kind: 'id-front',
      );
      final backKey = await uploads.uploadImage(
        localPath: _idBackPath!,
        kind: 'id-back',
      );

      final documents = <String, dynamic>{
        'primaryIdFrontUrl': frontKey,
        'primaryIdBackUrl': backKey,
        if (_idType == 'pan') 'panCardUrl': frontKey,
      };

      final body = <String, dynamic>{
        'idType': _idType,
        'idNumber': _idNumber.text.trim(),
        'fullName': _fullName.text.trim(),
        'gender': _gender,
        'phoneNumber': _phone.text.trim(),
        'dateOfBirth': _dobToIso(_dateOfBirth.text),
        'permanentAddress': permanent.toApiJson(),
        'presentSameAsPermanent': _sameAsPermanent,
        if (!_sameAsPermanent) 'presentAddress': present.toApiJson(),
        'dailyWageExpected': wage,
        'jobId': _primaryTrade!.id,
        'documents': documents,
        'workExperiences': [
          for (final entry in _workHistory)
            if (entry.companyId != null && entry.companyId!.isNotEmpty)
              {
                'companyId': entry.companyId,
                'yearsOfExperience': entry.yearsOfExperience ?? years,
              },
        ],
      };

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
                padding: EdgeInsets.fromLTRB(20.w, 8.h, 20.w, 16.h),
                child: FilledButton(
                  onPressed: _saving ? null : _save,
                  child: _saving
                      ? SizedBox(
                          width: 20.r,
                          height: 20.r,
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
        SizedBox(height: 12.h),
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
        SizedBox(height: 12.h),
        _formDropdown(
          value: _gender,
          label: l10n.gender,
          hint: l10n.selectGender,
          options: _genders,
          optionLabel: (value) => _genderLabel(l10n, value),
          onChanged: (value) => setState(() => _gender = value),
          l10n: l10n,
        ),
        SizedBox(height: 12.h),
        TextFormField(
          key: _dobFieldKey,
          controller: _dateOfBirth,
          keyboardType: TextInputType.number,
          textInputAction: TextInputAction.next,
          inputFormatters: const [DateSlashInputFormatter()],
          onChanged: _onDobTextChanged,
          decoration: InputDecoration(
            labelText: l10n.dateOfBirth,
            hintText: 'DD/MM/YYYY',
            suffixIcon: IconButton(
              tooltip: l10n.dateOfBirth,
              onPressed: _pickDateOfBirth,
              icon: const Icon(Icons.calendar_today_outlined),
            ),
          ),
          validator: (value) => _validateDob(value, l10n),
        ),
        if (!widget.isEditing) ...[
          SizedBox(height: 12.h),
          _formDropdown(
            value: _idType,
            label: l10n.idType,
            hint: l10n.selectIdType,
            options: _idTypes,
            optionLabel: (value) => _idTypeLabel(l10n, value),
            onChanged: _onIdTypeChanged,
            l10n: l10n,
          ),
          SizedBox(height: 12.h),
          TextFormField(
            controller: _idNumber,
            decoration: InputDecoration(labelText: l10n.idNumber),
            validator: (value) => _required(value, l10n),
          ),
        ],
        SizedBox(height: 16.h),
        Text(l10n.permanentAddress, style: textTheme.titleMedium),
        SizedBox(height: 12.h),
        AddressFields(
          controllers: _permanentAddress,
          enabled: true,
          validator: (value) => _required(value, l10n),
        ),
        SizedBox(height: 20.h),
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
    final textTheme = Theme.of(context).textTheme;
    final muted = Theme.of(context).colorScheme.onSurfaceVariant;
    final selectedType = _idType;

    if (selectedType == null) {
      return ListView(
        padding: AppStyles.detailPadding,
        children: [
          Text(l10n.documents, style: textTheme.titleMedium),
          SizedBox(height: 8.h),
          Text(
            l10n.selectIdType,
            style: textTheme.bodyLarge?.copyWith(color: muted),
          ),
        ],
      );
    }

    final docLabel = _idTypeLabel(l10n, selectedType);

    return ListView(
      padding: AppStyles.detailPadding,
      children: [
        Text(docLabel, style: textTheme.titleMedium),
        SizedBox(height: 4.h),
        Text(
          l10n.idImagesRequired,
          style: textTheme.bodySmall?.copyWith(color: muted),
        ),
        SizedBox(height: 16.h),
        _IdImageSlot(
          title: '${l10n.documentFront} · $docLabel',
          emptyLabel: l10n.addFrontImage,
          path: _idFrontPath,
          onPick: () => _pickIdImage(isFront: true),
          onClear: _idFrontPath == null
              ? null
              : () => setState(() => _idFrontPath = null),
        ),
        SizedBox(height: 12.h),
        _IdImageSlot(
          title: '${l10n.documentBack} · $docLabel',
          emptyLabel: l10n.addBackImage,
          path: _idBackPath,
          onPick: () => _pickIdImage(isFront: false),
          onClear: _idBackPath == null
              ? null
              : () => setState(() => _idBackPath = null),
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
        SizedBox(height: 8.h),
        Text(
          l10n.availabilityHint,
          style: textTheme.bodySmall?.copyWith(color: muted),
        ),
        SizedBox(height: 16.h),
        JobSearchField(
          initial: _primaryTrade,
          onSelected: (job) => setState(() => _primaryTrade = job),
        ),
        SizedBox(height: 12.h),
        TextFormField(
          controller: _subSkills,
          decoration: InputDecoration(
            labelText: l10n.subSkills,
            hintText: l10n.subSkillsHint,
          ),
        ),
        SizedBox(height: 12.h),
        TextFormField(
          controller: _years,
          keyboardType: TextInputType.number,
          inputFormatters: [FilteringTextInputFormatter.digitsOnly],
          decoration: InputDecoration(
            labelText: l10n.yearsOfExperience,
          ),
          validator: (value) => _required(value, l10n),
        ),
        SizedBox(height: 12.h),
        TextFormField(
          controller: _wage,
          keyboardType: TextInputType.number,
          inputFormatters: [FilteringTextInputFormatter.digitsOnly],
          decoration: InputDecoration(
            labelText: l10n.dailyWageExpected,
          ),
          validator: (value) => _required(value, l10n),
        ),
        SizedBox(height: 20.h),
        Text(l10n.workHistory, style: textTheme.titleMedium),
        SizedBox(height: 8.h),
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
            SizedBox(height: 8.h),
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

class _IdImageSlot extends StatelessWidget {
  const _IdImageSlot({
    required this.title,
    required this.emptyLabel,
    required this.path,
    required this.onPick,
    this.onClear,
  });

  final String title;
  final String emptyLabel;
  final String? path;
  final VoidCallback onPick;
  final VoidCallback? onClear;

  @override
  Widget build(BuildContext context) {
    final muted = Theme.of(context).colorScheme.onSurfaceVariant;

    return Card(
      clipBehavior: Clip.antiAlias,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          ListTile(
            title: Text(title),
            trailing: onClear == null
                ? null
                : IconButton(
                    onPressed: onClear,
                    icon: const Icon(Icons.close),
                    tooltip: 'Remove',
                  ),
          ),
          if (path != null)
            AspectRatio(
              aspectRatio: 16 / 10,
              child: Image.file(
                File(path!),
                fit: BoxFit.cover,
                errorBuilder: (_, _, _) => ColoredBox(
                  color: muted.withValues(alpha: 0.08),
                  child: Icon(Icons.broken_image_outlined, color: muted),
                ),
              ),
            )
          else
            Padding(
              padding: EdgeInsets.fromLTRB(16.w, 0, 16.w, 16.h),
              child: OutlinedButton.icon(
                onPressed: onPick,
                icon: const Icon(Icons.add_a_photo_outlined),
                label: Text(emptyLabel),
              ),
            ),
          if (path != null)
            Padding(
              padding: EdgeInsets.fromLTRB(16.w, 8.h, 16.w, 16.h),
              child: OutlinedButton.icon(
                onPressed: onPick,
                icon: const Icon(Icons.refresh),
                label: Text(emptyLabel),
              ),
            ),
        ],
      ),
    );
  }
}

/// Closed state matches other inputs; open state is a narrow popup under the field.
class _CompactSelectField extends StatelessWidget {
  const _CompactSelectField({
    required this.label,
    required this.hint,
    required this.value,
    required this.options,
    required this.optionLabel,
    required this.onChanged,
    this.errorText,
  });

  final String label;
  final String hint;
  final String? value;
  final String? errorText;
  final List<String> options;
  final String Function(String value) optionLabel;
  final ValueChanged<String?> onChanged;

  Future<void> _openMenu(BuildContext context) async {
    final box = context.findRenderObject() as RenderBox?;
    if (box == null || !box.hasSize) return;

    final offset = box.localToGlobal(Offset.zero);
    final size = box.size;
    final selected = await showMenu<String>(
      context: context,
      color: AppColors.card,
      elevation: 3,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(AppStyles.radius),
        side: const BorderSide(color: AppColors.border),
      ),
      constraints: BoxConstraints(
        minWidth: size.width,
        maxWidth: size.width,
      ),
      position: RelativeRect.fromLTRB(
        offset.dx,
        offset.dy + size.height + 4,
        offset.dx + size.width,
        offset.dy,
      ),
      items: [
        for (final option in options)
          PopupMenuItem<String>(
            value: option,
            height: 44,
            child: Text(
              optionLabel(option),
              style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                    fontWeight: option == value ? FontWeight.w600 : FontWeight.w400,
                    color: option == value
                        ? Theme.of(context).colorScheme.primary
                        : null,
                  ),
            ),
          ),
      ],
    );
    if (selected != null) onChanged(selected);
  }

  @override
  Widget build(BuildContext context) {
    final muted = Theme.of(context).colorScheme.onSurfaceVariant;

    return Semantics(
      button: true,
      label: value == null ? hint : optionLabel(value!),
      child: InkWell(
        onTap: () => _openMenu(context),
        borderRadius: BorderRadius.circular(AppStyles.radius),
        child: InputDecorator(
          // Empty → only floating/centered label (same as TextFormField).
          // Avoid drawing hint text in the child or it stacks on the label.
          isEmpty: value == null,
          decoration: InputDecoration(
            labelText: label,
            errorText: errorText,
            suffixIcon: Icon(Icons.keyboard_arrow_down_rounded, color: muted),
          ),
          child: ConstrainedBox(
            constraints: const BoxConstraints(minHeight: 24),
            child: Align(
              alignment: Alignment.centerLeft,
              child: Text(
                value == null ? '' : optionLabel(value!),
                style: Theme.of(context).textTheme.bodyLarge,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              ),
            ),
          ),
        ),
      ),
    );
  }
}
