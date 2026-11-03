enum AccountStatus { pending, accepted, rejected }

AccountStatus accountStatusFromJson(String value) {
  switch (value) {
    case 'accepted':
      return AccountStatus.accepted;
    case 'rejected':
      return AccountStatus.rejected;
    case 'pending':
    default:
      return AccountStatus.pending;
  }
}

/// Partner roles from the API: `csc` | `cmc` | `anganwadi` | `gov_ngo`.
class Partner {
  const Partner({
    required this.id,
    required this.role,
    required this.fullName,
    required this.phoneNumber,
    required this.state,
    required this.district,
    required this.pincode,
    required this.status,
    this.email,
    this.rejectionReason,
    this.profile = const {},
  });

  final String id;
  final String role;
  final String fullName;
  final String phoneNumber;
  final String? email;
  final String state;
  final String district;
  final String pincode;
  final AccountStatus status;
  final String? rejectionReason;
  final Map<String, dynamic> profile;

  factory Partner.fromJson(Map<String, dynamic> json) {
    final rawProfile = json['profile'];
    return Partner(
      id: json['id'] as String? ?? json['_id'] as String? ?? '',
      role: json['role'] as String? ?? '',
      fullName: json['fullName'] as String? ?? '',
      phoneNumber: json['phoneNumber'] as String? ?? '',
      email: json['email'] as String?,
      state: json['state'] as String? ?? '',
      district: json['district'] as String? ?? '',
      pincode: json['pincode'] as String? ?? '',
      status: accountStatusFromJson(json['status'] as String? ?? 'pending'),
      rejectionReason: json['rejectionReason'] as String?,
      profile: rawProfile is Map
          ? Map<String, dynamic>.from(rawProfile)
          : const {},
    );
  }
}
