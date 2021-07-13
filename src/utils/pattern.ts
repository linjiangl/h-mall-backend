const config: Record<string, RegExp> = {
  mobile: new RegExp('^1\\d{10}$'),
  tel: new RegExp('^\\d{3,4}[ -]\\d{7,8}$'),
  qq: new RegExp('^[1-9]\\d{4, 10}$'),
};

export const getPattern = (key: string): RegExp => {
  let reg: RegExp = new RegExp('.');
  if (config.hasOwnProperty(key)) {
    reg = config[key];
  }
  return reg;
};
