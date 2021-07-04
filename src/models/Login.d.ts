declare namespace Login {
  // 企业微信配置
  export type WeWorkConfig = {
    corp_id: string;
    agent_id: string;
    state: string;
  };

  export type WeWorkLogin = {
    code?: string;
    appid?: string;
    state?: string;
  };

  export type LoginStep = {
    type: 'starting' | 'padding' | 'successed' | 'failed';
  };

  export type Jwt = {
    exp: number;
    token: string;
  };
}
