import {
  fetchEmailTranslations,
  type EmailTranslations,
} from '#contents/email-translations';
import { fetchProductConfig, ProductConfig } from '#contents/product-config';
import { fetchSiteConfig, type SiteConfig } from '#contents/site-config';
import { ProductList, type Product } from '#email/common/products';
import { LanguageCode } from '@content-island/api-client';
import * as email from '@react-email/components';
import { Markdown } from '@react-email/markdown';
import { Body, Root } from '../common/components';

interface Props {
  customerName: string;
  customerUrl: string;
  paymentUrl: string;
  products: Product[];
  totalAmount: string;
  logoUrl: string;
  translations: EmailTranslations;
  siteConfig: SiteConfig;
  productConfig: ProductConfig;
}

const AdminOrderEmail = (props: Props) => {
  const {
    customerName,
    customerUrl,
    paymentUrl,
    products,
    totalAmount,
    logoUrl,
    translations,
    siteConfig,
    productConfig,
  } = props;
  return (
    <Root
      logoUrl={logoUrl}
      translations={translations}
      siteConfig={siteConfig}
      productConfig={productConfig}
    >
      <Body
        title={translations['adminOrder.title']}
        preview={translations['adminOrder.preview'].replace(
          '{{totalAmount}}',
          totalAmount
        )}
      >
        <email.Section>
          <Markdown>
            {translations['adminOrder.body']
              .replace('{{customerName}}', customerName)
              .replace('{{customerUrl}}', customerUrl)}
          </Markdown>
        </email.Section>
        <ProductList products={products} totalAmount={totalAmount} />
        <email.Section>
          <Markdown>
            {translations['adminOrder.footer'].replace(
              '{{paymentUrl}}',
              paymentUrl
            )}
          </Markdown>
        </email.Section>
      </Body>
    </Root>
  );
};

export const getAdminOrderEmail = async (
  props: Omit<Props, 'translations' | 'siteConfig' | 'productConfig'>
) => {
  const [translations, siteConfig, productConfig] = await Promise.all([
    fetchEmailTranslations(),
    fetchSiteConfig(),
    fetchProductConfig(),
  ]);

  return {
    html: await email.render(
      <AdminOrderEmail
        {...props}
        translations={translations}
        siteConfig={siteConfig}
        productConfig={productConfig}
      />
    ),
    subject: translations['adminOrder.subject'].replace(
      '{{customerName}}',
      props.customerName
    ),
  };
};

/* Only for email playground dev mode ⬇️ */
AdminOrderEmail.PreviewProps = {
  customerName: 'John Doe',
  customerUrl: 'https://dashboard.stripe.com/test/customers/cus_TwkNh6EHzT1GQ1',
  paymentUrl:
    'https://dashboard.stripe.com/test/payments/pi_3NQO2aHjYqLZzYpXl5eX9b6p',
  products: [
    {
      id: '1',
      name: 'Avocado Hass - 1kg',
      quantity: 2,
      priceLabel: '6.50 € incl. tax / unit',
      totalPriceLabel: '13.00 €',
      imageUrl:
        'https://prod-content-island.s3.eu-west-3.amazonaws.com/landalousie/landalousie/product/avocat-hass-%F0%9F%A5%91/fr/466dc113-b1f8-4729-886a-c15f065f32f5.jpg',
    },
    {
      id: '2',
      name: 'Extra virgin olive oil',
      quantity: 1,
      priceLabel: '50.00 € incl. tax / unit',
      totalPriceLabel: '50.00 €',
      imageUrl:
        'https://prod-content-island.s3.eu-west-3.amazonaws.com/landalousie/landalousie/product/huile-d-olive-vierge-extra-3-litres-%F0%9F%92%9A/fr/36704279-4923-4cd7-966b-73136148e3c3.jpg',
    },
  ],
  totalAmount: `63.00 €`,
  logoUrl:
    'http://localhost:8080/api/assets/a63f0aa2193322579e0d064879708030:aae56d81739453ebc8d10700e2e74bcc:79253e7f04d6f08e5054c45784ca7137cd09dff8252383291f1df9764bcbaef6db281c49fca567468d677b5a208793a2d5ab816bfa8bd7cc7308c3c24723b3899ffb3d7591c38fb8eaa94d4e1d46413c56b334d4c11ec51248ce0d3c1b5edc47c60243',
  translations: {
    id: '1',
    language: 'en' as LanguageCode,
    lastUpdate: new Date().toISOString(),
    'adminOrder.subject':
      'Order received! {{customerName}} has placed an order',
    'adminOrder.preview':
      'The customer has completed the order with a total of {{totalAmount}}',
    'adminOrder.title': 'Order placed',
    'adminOrder.body':
      'Customer [{{customerName}}]({{customerUrl}}) has placed the following order:',
    'adminOrder.footer':
      'You can view more details about the [payment]({{paymentUrl}})',
    'productList.quantity': 'Quantity',
    'productList.total': 'Total',
  },
  productConfig: {
    taxesLabel: 'including taxes',
  },
} as Props;

export default AdminOrderEmail;
/* Only for email playground dev mode ⬆️ */
