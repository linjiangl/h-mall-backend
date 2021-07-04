declare namespace Setting {
  enum SettingKeys {
    system = 'system',
    agreement = 'agreement',
  }

  type Abstract = {
    key: SettingKeys;
    value: any;
    created_time?: number;
    updated_time?: number;
  };
}
