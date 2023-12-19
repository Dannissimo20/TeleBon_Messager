import { useTranslation } from 'react-i18next';

const CallProduct = () => {
  const { t } = useTranslation();

  return (
    <div>
      {t('Наш продукт')}
      <>{/* <CallSip {...SIP_SETTINGS} login={"102"} password={"rereirf"} /> */}</>
    </div>
  );
};

export default CallProduct;
