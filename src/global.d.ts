interface Window {
  Telegram?: {
    WebApp: {
      ready: () => void;
      initDataUnsafe?: {
        user?: {
          first_name?: string;
          last_name?: string;
          id?: number;
          username?: string;
        };
      };
    };
  };
}