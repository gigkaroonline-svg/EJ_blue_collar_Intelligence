class Company {
  const Company({required this.id, required this.name});

  final String id;
  final String name;
}

class WorkEntry {
  const WorkEntry({
    required this.id,
    this.companyId,
    this.companyName,
    this.trade,
    required this.startDate,
    this.endDate,
  });

  final String id;
  final String? companyId;
  final String? companyName;
  final String? trade;
  final DateTime startDate;
  final DateTime? endDate;

  bool get isCurrent => endDate == null;

  WorkEntry copyWith({
    String? id,
    String? companyId,
    String? companyName,
    String? trade,
    DateTime? startDate,
    DateTime? endDate,
    bool clearEndDate = false,
  }) {
    return WorkEntry(
      id: id ?? this.id,
      companyId: companyId ?? this.companyId,
      companyName: companyName ?? this.companyName,
      trade: trade ?? this.trade,
      startDate: startDate ?? this.startDate,
      endDate: clearEndDate ? null : (endDate ?? this.endDate),
    );
  }
}

class CandidateDocument {
  const CandidateDocument({
    required this.type,
    this.imagePath,
  });

  final DocumentType type;
  final String? imagePath;
}

enum DocumentType {
  aadhaar,
  pan,
  bankPassbook,
  drivingLicence,
  photo,
}

class Address {
  const Address({
    required this.addressLine,
    required this.villageOrTown,
    required this.district,
    required this.state,
    required this.pincode,
  });

  final String addressLine;
  final String villageOrTown;
  final String district;
  final String state;
  final String pincode;

  Address copyWith({
    String? addressLine,
    String? villageOrTown,
    String? district,
    String? state,
    String? pincode,
  }) {
    return Address(
      addressLine: addressLine ?? this.addressLine,
      villageOrTown: villageOrTown ?? this.villageOrTown,
      district: district ?? this.district,
      state: state ?? this.state,
      pincode: pincode ?? this.pincode,
    );
  }

  bool isSameAs(Address other) {
    return addressLine == other.addressLine &&
        villageOrTown == other.villageOrTown &&
        district == other.district &&
        state == other.state &&
        pincode == other.pincode;
  }
}

class CandidatePersonal {
  const CandidatePersonal({
    required this.fullName,
    required this.phoneNumber,
    required this.gender,
    required this.dateOfBirth,
    required this.permanentAddress,
    required this.currentAddress,
  });

  final String fullName;
  final String phoneNumber;
  final String gender;
  final String dateOfBirth;
  final Address permanentAddress;
  final Address currentAddress;

  CandidatePersonal copyWith({
    String? fullName,
    String? phoneNumber,
    String? gender,
    String? dateOfBirth,
    Address? permanentAddress,
    Address? currentAddress,
  }) {
    return CandidatePersonal(
      fullName: fullName ?? this.fullName,
      phoneNumber: phoneNumber ?? this.phoneNumber,
      gender: gender ?? this.gender,
      dateOfBirth: dateOfBirth ?? this.dateOfBirth,
      permanentAddress: permanentAddress ?? this.permanentAddress,
      currentAddress: currentAddress ?? this.currentAddress,
    );
  }
}

class CandidateExperience {
  const CandidateExperience({
    required this.primaryTrade,
    required this.subSkills,
    required this.yearsOfExperience,
    required this.dailyWageExpected,
  });

  final String primaryTrade;
  final List<String> subSkills;
  final int yearsOfExperience;
  final int dailyWageExpected;

  CandidateExperience copyWith({
    String? primaryTrade,
    List<String>? subSkills,
    int? yearsOfExperience,
    int? dailyWageExpected,
  }) {
    return CandidateExperience(
      primaryTrade: primaryTrade ?? this.primaryTrade,
      subSkills: subSkills ?? this.subSkills,
      yearsOfExperience: yearsOfExperience ?? this.yearsOfExperience,
      dailyWageExpected: dailyWageExpected ?? this.dailyWageExpected,
    );
  }
}

class Candidate {
  const Candidate({
    required this.id,
    required this.personal,
    required this.experience,
    required this.documents,
    required this.workHistory,
  });

  final String id;
  final CandidatePersonal personal;
  final CandidateExperience experience;
  final List<CandidateDocument> documents;
  final List<WorkEntry> workHistory;

  bool get isCurrentlyWorking {
    for (final entry in workHistory) {
      if (entry.endDate == null) {
        return true;
      }
    }
    return false;
  }

  bool get isAvailable => !isCurrentlyWorking;

  /// Current job first, then newest startDate.
  List<WorkEntry> get sortedWorkHistory {
    final entries = List<WorkEntry>.from(workHistory);
    entries.sort((a, b) {
      if (a.isCurrent != b.isCurrent) {
        return a.isCurrent ? -1 : 1;
      }
      return b.startDate.compareTo(a.startDate);
    });
    return entries;
  }

  Candidate copyWith({
    String? id,
    CandidatePersonal? personal,
    CandidateExperience? experience,
    List<CandidateDocument>? documents,
    List<WorkEntry>? workHistory,
  }) {
    return Candidate(
      id: id ?? this.id,
      personal: personal ?? this.personal,
      experience: experience ?? this.experience,
      documents: documents ?? this.documents,
      workHistory: workHistory ?? this.workHistory,
    );
  }
}

class CompanyCandidateLink {
  const CompanyCandidateLink({
    required this.candidate,
    required this.isCurrent,
  });

  final Candidate candidate;
  final bool isCurrent;
}

const seedCompanies = <Company>[
  Company(id: 'c1', name: 'Surat Textiles'),
  Company(id: 'c2', name: 'Diamond Works'),
  Company(id: 'c3', name: 'Construction Plus'),
];

Company? findCompanyById(String id) {
  for (final company in seedCompanies) {
    if (company.id == id) {
      return company;
    }
  }
  return null;
}

String resolveCompanyName(WorkEntry entry) {
  if (entry.companyId != null) {
    final company = findCompanyById(entry.companyId!);
    if (company != null) {
      return company.name;
    }
  }
  return entry.companyName ?? '';
}

List<CompanyCandidateLink> candidatesByCompany(
  String companyId,
  List<Candidate> candidates,
) {
  final links = <CompanyCandidateLink>[];
  for (final candidate in candidates) {
    var matched = false;
    var isCurrent = false;
    for (final entry in candidate.workHistory) {
      if (entry.companyId == companyId) {
        matched = true;
        if (entry.isCurrent) {
          isCurrent = true;
        }
      }
    }
    if (matched) {
      links.add(
        CompanyCandidateLink(candidate: candidate, isCurrent: isCurrent),
      );
    }
  }
  links.sort((a, b) {
    if (a.isCurrent != b.isCurrent) {
      return a.isCurrent ? -1 : 1;
    }
    return a.candidate.personal.fullName.compareTo(b.candidate.personal.fullName);
  });
  return links;
}

final seedCandidates = <Candidate>[
  Candidate(
    id: '1',
    personal: CandidatePersonal(
      fullName: 'Ramesh Kumar',
      phoneNumber: '9811111111',
      gender: 'Male',
      dateOfBirth: '12 Mar 1990',
      permanentAddress: Address(
        addressLine: 'Near bus stand',
        villageOrTown: 'Jaunpur',
        district: 'Jaunpur',
        state: 'Uttar Pradesh',
        pincode: '222001',
      ),
      currentAddress: Address(
        addressLine: 'Room 12, Industrial area',
        villageOrTown: 'Pandesara',
        district: 'Surat',
        state: 'Gujarat',
        pincode: '394221',
      ),
    ),
    experience: CandidateExperience(
      primaryTrade: 'Mason',
      subSkills: ['Brick work', 'Plaster'],
      yearsOfExperience: 6,
      dailyWageExpected: 700,
    ),
    documents: [
      CandidateDocument(type: DocumentType.aadhaar, imagePath: 'placeholder'),
      CandidateDocument(type: DocumentType.photo, imagePath: 'placeholder'),
    ],
    workHistory: [
      WorkEntry(
        id: 'w1',
        companyId: 'c1',
        trade: 'Mason',
        startDate: DateTime(2021, 3, 1),
        endDate: DateTime(2023, 8, 15),
      ),
      WorkEntry(
        id: 'w2',
        companyName: 'Local site contractor',
        trade: 'Helper',
        startDate: DateTime(2019, 6, 1),
        endDate: DateTime(2021, 2, 28),
      ),
    ],
  ),
  Candidate(
    id: '2',
    personal: CandidatePersonal(
      fullName: 'Sita Devi',
      phoneNumber: '9822222222',
      gender: 'Female',
      dateOfBirth: '04 Aug 1994',
      permanentAddress: Address(
        addressLine: 'Ward 4, Main road',
        villageOrTown: 'Azamgarh',
        district: 'Azamgarh',
        state: 'Uttar Pradesh',
        pincode: '276001',
      ),
      currentAddress: Address(
        addressLine: 'House 8, Textile market',
        villageOrTown: 'Udhna',
        district: 'Surat',
        state: 'Gujarat',
        pincode: '394210',
      ),
    ),
    experience: CandidateExperience(
      primaryTrade: 'Painter',
      subSkills: ['Interior', 'Exterior'],
      yearsOfExperience: 3,
      dailyWageExpected: 550,
    ),
    documents: [
      CandidateDocument(type: DocumentType.pan, imagePath: 'placeholder'),
    ],
    workHistory: [
      WorkEntry(
        id: 'w3',
        companyId: 'c1',
        trade: 'Painter',
        startDate: DateTime(2022, 1, 10),
        endDate: DateTime(2024, 5, 20),
      ),
    ],
  ),
  Candidate(
    id: '3',
    personal: CandidatePersonal(
      fullName: 'Amit Singh',
      phoneNumber: '9833333333',
      gender: 'Male',
      dateOfBirth: '21 Jan 1987',
      permanentAddress: Address(
        addressLine: 'Near mandir',
        villageOrTown: 'Gorakhpur',
        district: 'Gorakhpur',
        state: 'Uttar Pradesh',
        pincode: '273001',
      ),
      currentAddress: Address(
        addressLine: 'Near mandir',
        villageOrTown: 'Gorakhpur',
        district: 'Gorakhpur',
        state: 'Uttar Pradesh',
        pincode: '273001',
      ),
    ),
    experience: CandidateExperience(
      primaryTrade: 'Electrician',
      subSkills: ['Wiring', 'Panel work'],
      yearsOfExperience: 8,
      dailyWageExpected: 900,
    ),
    documents: [
      CandidateDocument(type: DocumentType.aadhaar, imagePath: 'placeholder'),
      CandidateDocument(type: DocumentType.drivingLicence),
    ],
    workHistory: [
      WorkEntry(
        id: 'w4',
        companyId: 'c3',
        trade: 'Electrician',
        startDate: DateTime(2024, 2, 1),
      ),
      WorkEntry(
        id: 'w5',
        companyId: 'c2',
        trade: 'Electrician',
        startDate: DateTime(2020, 4, 1),
        endDate: DateTime(2023, 12, 31),
      ),
    ],
  ),
  Candidate(
    id: '4',
    personal: CandidatePersonal(
      fullName: 'Priya Sharma',
      phoneNumber: '9844444444',
      gender: 'Female',
      dateOfBirth: '15 Nov 1996',
      permanentAddress: Address(
        addressLine: 'Sector 11',
        villageOrTown: 'Varanasi',
        district: 'Varanasi',
        state: 'Uttar Pradesh',
        pincode: '221001',
      ),
      currentAddress: Address(
        addressLine: 'Flat 3, Ring road',
        villageOrTown: 'Vesu',
        district: 'Surat',
        state: 'Gujarat',
        pincode: '395007',
      ),
    ),
    experience: CandidateExperience(
      primaryTrade: 'Carpenter',
      subSkills: ['Furniture', 'Fitting'],
      yearsOfExperience: 4,
      dailyWageExpected: 650,
    ),
    documents: [],
    workHistory: [],
  ),
  Candidate(
    id: '5',
    personal: CandidatePersonal(
      fullName: 'Vikram Yadav',
      phoneNumber: '9855555555',
      gender: 'Male',
      dateOfBirth: '09 Jul 1992',
      permanentAddress: Address(
        addressLine: 'House 18, Block C',
        villageOrTown: 'Ballia',
        district: 'Ballia',
        state: 'Uttar Pradesh',
        pincode: '277001',
      ),
      currentAddress: Address(
        addressLine: 'Gate 2, Diamond market',
        villageOrTown: 'Varachha',
        district: 'Surat',
        state: 'Gujarat',
        pincode: '395006',
      ),
    ),
    experience: CandidateExperience(
      primaryTrade: 'Plumber',
      subSkills: ['Pipeline', 'Bathroom fitting'],
      yearsOfExperience: 5,
      dailyWageExpected: 600,
    ),
    documents: [
      CandidateDocument(
        type: DocumentType.bankPassbook,
        imagePath: 'placeholder',
      ),
    ],
    workHistory: [
      WorkEntry(
        id: 'w6',
        companyId: 'c2',
        trade: 'Plumber',
        startDate: DateTime(2023, 9, 1),
      ),
    ],
  ),
  Candidate(
    id: '6',
    personal: CandidatePersonal(
      fullName: 'Meena Kumari',
      phoneNumber: '9866666666',
      gender: 'Female',
      dateOfBirth: '28 Feb 1998',
      permanentAddress: Address(
        addressLine: 'Near panchayat bhavan',
        villageOrTown: 'Ghazipur',
        district: 'Ghazipur',
        state: 'Uttar Pradesh',
        pincode: '233001',
      ),
      currentAddress: Address(
        addressLine: 'Lane 5, Site colony',
        villageOrTown: 'Katargam',
        district: 'Surat',
        state: 'Gujarat',
        pincode: '395004',
      ),
    ),
    experience: CandidateExperience(
      primaryTrade: 'Helper',
      subSkills: ['Site support', 'Material handling'],
      yearsOfExperience: 2,
      dailyWageExpected: 400,
    ),
    documents: [],
    workHistory: [
      WorkEntry(
        id: 'w7',
        companyId: 'c3',
        trade: 'Helper',
        startDate: DateTime(2025, 1, 15),
      ),
    ],
  ),
];
