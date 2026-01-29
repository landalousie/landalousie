export interface CountryPhoneCode {
  code: string;
  name: string;
  flag: string;
}

export const COUNTRY_PHONE_CODES: CountryPhoneCode[] = [
  { code: '+34', name: 'Spain', flag: '🇪🇸' },
  { code: '+33', name: 'France', flag: '🇫🇷' },
  { code: '+49', name: 'Germany', flag: '🇩🇪' },
  { code: '+44', name: 'United Kingdom', flag: '🇬🇧' },
  { code: '+39', name: 'Italy', flag: '🇮🇹' },
  { code: '+351', name: 'Portugal', flag: '🇵🇹' },
  { code: '+32', name: 'Belgium', flag: '🇧🇪' },
  { code: '+31', name: 'Netherlands', flag: '🇳🇱' },
  { code: '+41', name: 'Switzerland', flag: '🇨🇭' },
  { code: '+1', name: 'United States', flag: '🇺🇸' },
];
