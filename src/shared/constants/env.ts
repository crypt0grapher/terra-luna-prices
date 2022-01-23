export const isServer = typeof window === 'undefined';

export const isClient = !isServer;

export const NODE_ENV = process.env.NODE_ENV;

export const PORT = process.env.BLUNA_PORT || 3000;


export const chain_id = 'columbus-5';
export const node = 'https://lcd.terra.dev';

export const bLuna = 'terra1kc87mu460fwkqte29rquh4hc20m54fxwtsx7gp';

export const bLunaPairAddresses = {
  'TerraSwap': 'terra1jxazgm67et0ce260kvrpfv50acuushpjsz2y0p',
  'LOOP': 'terra1v93ll6kqp33unukuwls3pslquehnazudu653au',
  'Astroport': 'terra1j66jatn3k50hjtg2xemnjm8s7y8dws9xqa5y8w',
};
