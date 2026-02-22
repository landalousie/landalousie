import {
  fetchEmailTranslations,
  type EmailTranslations,
} from '#contents/email-translations';
import { fetchSiteConfig, type SiteConfig } from '#contents/site-config';
import { LanguageCode } from '@content-island/api-client';
import * as email from '@react-email/components';
import { Markdown } from '@react-email/markdown';
import { Body, Root } from '../common/components';

interface Props {
  customerName: string;
  customerUrl: string;
  paymentUrl: string;
  logoUrl: string;
  translations: EmailTranslations;
  siteConfig: SiteConfig;
}

const CheckoutFailedEmail = (props: Props) => {
  const {
    customerName,
    customerUrl,
    paymentUrl,
    logoUrl,
    translations,
    siteConfig,
  } = props;
  return (
    <Root logoUrl={logoUrl} translations={translations} siteConfig={siteConfig}>
      <Body
        title={translations['checkoutFailed.title']}
        preview={translations['checkoutFailed.subject']}
      >
        <email.Section>
          <Markdown>
            {translations['checkoutFailed.body']
              .replace('{{customerName}}', customerName)
              .replace('{{customerUrl}}', customerUrl)
              .replace('{{paymentUrl}}', paymentUrl)}
          </Markdown>
        </email.Section>
      </Body>
    </Root>
  );
};

export const getCheckoutFailedEmail = async (
  props: Omit<Props, 'translations' | 'siteConfig'>
) => {
  const [translations, siteConfig] = await Promise.all([
    fetchEmailTranslations(),
    fetchSiteConfig(),
  ]);

  return {
    html: await email.render(
      <CheckoutFailedEmail
        {...props}
        translations={translations}
        siteConfig={siteConfig}
      />
    ),
    subject: translations['checkoutFailed.subject'].replace(
      '{{customerName}}',
      props.customerName
    ),
  };
};

/* Only for email playground dev mode ⬇️ */
CheckoutFailedEmail.PreviewProps = {
  customerName: 'John Doe',
  customerUrl: 'https://dashboard.stripe.com/test/customers/cus_TwkNh6EHzT1GQ1',
  paymentUrl:
    'https://dashboard.stripe.com/test/payments/pi_3NQO2aHjYqLZzYpXl5eX9b6p',
  logoUrl:
    'http://localhost:8080/api/assets/a63f0aa2193322579e0d064879708030:aae56d81739453ebc8d10700e2e74bcc:79253e7f04d6f08e5054c45784ca7137cd09dff8252383291f1df9764bcbaef6db281c49fca567468d677b5a208793a2d5ab816bfa8bd7cc7308c3c24723b3899ffb3d7591c38fb8eaa94d4e1d46413c56b334d4c11ec51248ce0d3c1b5edc47c60243',
  translations: {
    id: '1',
    language: 'en' as LanguageCode,
    lastUpdate: new Date().toISOString(),
    'checkoutFailed.subject':
      'Order canceled! {{customerName}} was unable to complete the order',
    'checkoutFailed.preview':
      'The checkout process has failed or been canceled',
    'checkoutFailed.title': 'Order canceled',
    'checkoutFailed.body': `The order for customer [{{customerName}}]({{customerUrl}}) could not be completed.

You can view more details about the [payment]({{paymentUrl}})`,
  },
} as Props;

export default CheckoutFailedEmail;
/* Only for email playground dev mode ⬆️ */
