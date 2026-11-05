String partnerRoleLabel(String role) {
  switch (role) {
    case 'csc':
      return 'CSC';
    case 'cmc':
      return 'CMC';
    case 'anganwadi':
      return 'Anganwadi';
    case 'gov_ngo':
      return 'Gov / NGO';
    default:
      return role;
  }
}

String partnerProfileFieldLabel(String key) {
  final spaced = key.replaceAllMapped(
    RegExp(r'([a-z])([A-Z])'),
    (m) => '${m[1]} ${m[2]}',
  );
  if (spaced.isEmpty) return key;
  return spaced[0].toUpperCase() + spaced.substring(1);
}
