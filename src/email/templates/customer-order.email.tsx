import {
  fetchEmailTranslations,
  type EmailTranslations,
} from '#contents/email-translations';
import { fetchNextPickup, type NextPickup } from '#contents/next-pickup';
import { fetchProductConfig, ProductConfig } from '#contents/product-config';
import { fetchSiteConfig, type SiteConfig } from '#contents/site-config';
import { ProductList, type Product } from '#email/common/products';
import { mapNextPickupDescription } from '#pods/next-pickup/next-pickup.mappers';
import { LanguageCode } from '@content-island/api-client';
import * as email from '@react-email/components';
import { Body, Button, Root } from '../common/components';

interface Props {
  customerName: string;
  products: Product[];
  totalAmount: string;
  logoUrl: string;
  translations: EmailTranslations;
  siteConfig: SiteConfig;
  productConfig: ProductConfig;
  nextPickup: NextPickup;
  invoiceUrl?: string;
}

const CustomerOrderEmail = (props: Props) => {
  const {
    customerName,
    products,
    totalAmount,
    logoUrl,
    translations,
    siteConfig,
    productConfig,
    nextPickup,
    invoiceUrl,
  } = props;

  return (
    <Root
      logoUrl={logoUrl}
      translations={translations}
      siteConfig={siteConfig}
      productConfig={productConfig}
    >
      <Body
        title={translations['customerOrder.title']}
        preview={translations['customerOrder.preview']}
      >
        <email.Section>
          <email.Text className="text-text text-base">
            {translations['customerOrder.body'].replace(
              '{{customerName}}',
              customerName
            )}
          </email.Text>
        </email.Section>
        <ProductList products={products} totalAmount={totalAmount} />

        <email.Section className="text-center mt-8">
          <email.Text className="text-text text-base font-semibold">
            {nextPickup.title}
          </email.Text>
          <email.Text className="text-text text-sm">
            {mapNextPickupDescription(nextPickup.description, nextPickup)}
          </email.Text>
        </email.Section>

        {invoiceUrl && (
          <email.Section className="text-center mt-8">
            <Button href={invoiceUrl} variant="secondary">
              {translations['customerOrder.invoiceButton']}
            </Button>
          </email.Section>
        )}
      </Body>
    </Root>
  );
};

export const getCustomerOrderEmail = async (
  props: Omit<
    Props,
    'translations' | 'siteConfig' | 'productConfig' | 'nextPickup'
  >
) => {
  const [translations, siteConfig, productConfig, nextPickup] =
    await Promise.all([
      fetchEmailTranslations(),
      fetchSiteConfig(),
      fetchProductConfig(),
      fetchNextPickup(),
    ]);

  return {
    html: await email.render(
      <CustomerOrderEmail
        {...props}
        translations={translations}
        siteConfig={siteConfig}
        productConfig={productConfig}
        nextPickup={nextPickup}
      />
    ),
    subject: translations['customerOrder.subject'].replace(
      '{{totalAmount}}',
      props.totalAmount
    ),
  };
};

/* Only for email playground dev mode ⬇️ */
CustomerOrderEmail.PreviewProps = {
  customerName: 'John Doe',
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
    'https://prod-content-island.s3.eu-west-3.amazonaws.com/landalousie/landalousie/siteconfig/siteconfig/fr/2026-01-1310-54-35.png',
  translations: {
    id: '1',
    language: 'en' as LanguageCode,
    lastUpdate: new Date().toISOString(),
    'customerOrder.subject':
      "Order received! Your purchase at L'Andalousie (total: {{totalAmount}})",
    'customerOrder.preview':
      'Thank you for your purchase — here is the summary and a link to download your invoice.',
    'customerOrder.title': 'Order Confirmation',
    'customerOrder.body':
      'Hello {{customerName}}, here is a summary of your order',
    'customerOrder.invoiceButton': 'Download my invoice',
    'productList.quantity': 'Quantity',
    'productList.total': 'Total',
  },
  productConfig: {
    taxesLabel: 'including taxes',
  },
  nextPickup: {
    title: 'Date & Point de retrait 📦',
    description:
      "✍️ RDV pour récupérer ma cagette le {{nextPickupDate}} à L'USINE AU SEQUOIA  - 09240  SENTENAC-DE-SEROU de 18h à 20h.",
    dateTime: new Date('2026-02-23 18:00').toISOString(),
  },
} as Props;

export default CustomerOrderEmail;
/* Only for email playground dev mode ⬆️ */
