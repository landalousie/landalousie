import {
  fetchEmailTranslations,
  type EmailTranslations,
} from '#contents/email-translations';
import { fetchProductConfig, ProductConfig } from '#contents/product-config';
import { fetchSiteConfig, type SiteConfig } from '#contents/site-config';
import { ProductList, type Product } from '#email/core/products';
import * as email from '@react-email/components';
import { Button, Head, Header, Root } from '../common/components';

interface Props {
  customerName: string;
  products: Product[];
  totalAmount: string;
  invoiceUrl?: string;
  translations: EmailTranslations;
  siteConfig?: SiteConfig;
  productConfig?: ProductConfig;
}

const CustomerOrder = (props: Props) => {
  const {
    customerName,
    products,
    totalAmount,
    invoiceUrl,
    translations,
    siteConfig,
    productConfig,
  } = props;

  return (
    <Root
      translations={translations}
      siteConfig={siteConfig}
      productConfig={productConfig}
    >
      <Head title={translations['customerOrder.title']} />
      <email.Preview>{translations['customerOrder.preview']}</email.Preview>
      <email.Body className="bg-background font-body">
        <email.Container className="bg-white mx-auto p-12 mb-16 rounded-2xl border border-gray-200">
          <Header>{translations['customerOrder.title']} </Header>
          <email.Section>
            <email.Text className="text-text text-base">
              {translations['customerOrder.body'].replace(
                '{{customerName}}',
                customerName
              )}
            </email.Text>
          </email.Section>
          <ProductList products={products} totalAmount={totalAmount} />

          {invoiceUrl && (
            <email.Section className="text-center mt-8">
              <Button href={invoiceUrl} variant="secondary">
                {translations['customerOrder.invoiceButton']}
              </Button>
            </email.Section>
          )}
        </email.Container>
      </email.Body>
    </Root>
  );
};

export const getCustomerOrderEmail = async (
  props: Omit<Props, 'translations' | 'siteConfig' | 'productConfig'>
) => {
  const [translations, siteConfig, productConfig] = await Promise.all([
    fetchEmailTranslations(),
    fetchSiteConfig(),
    fetchProductConfig(),
  ]);

  return {
    html: await email.render(
      <CustomerOrder
        {...props}
        translations={translations}
        siteConfig={siteConfig}
        productConfig={productConfig}
      />
    ),
    subject: translations['customerOrder.subject'].replace(
      '{{totalAmount}}',
      props.totalAmount
    ),
  };
};

/* Only for email playground dev mode ⬇️ */
CustomerOrder.PreviewProps = {
  customerName: 'Marin',
  products: [
    {
      id: '1',
      name: 'Avocat Hass - 1kg',
      quantity: 2,
      priceLabel: '6.50 € TTC / unité',
      totalPriceLabel: '13.00 €',
      imageUrl:
        'https://prod-content-island.s3.eu-west-3.amazonaws.com/landalousie/landalousie/product/avocat-hass-%F0%9F%A5%91/fr/466dc113-b1f8-4729-886a-c15f065f32f5.jpg',
    },
    {
      id: '2',
      name: "Huile d'olive vierge extra",
      quantity: 1,
      priceLabel: '50.00 € TTC / unité',
      totalPriceLabel: '50.00 €',
      imageUrl:
        'https://prod-content-island.s3.eu-west-3.amazonaws.com/landalousie/landalousie/product/huile-d-olive-vierge-extra-3-litres-%F0%9F%92%9A/fr/36704279-4923-4cd7-966b-73136148e3c3.jpg',
    },
  ],
  totalAmount: `63.00 €`,
  translations: {
    id: '1',
    language: 'fr',
    lastUpdate: new Date().toISOString(),
    'customerOrder.subject':
      "¡Pedido recibido! Tu compra en L'Andalousie (total: {{totalAmount}} €)",
    'customerOrder.preview':
      'Gracias por tu compra — aquí tienes el resumen y el enlace para descargar la factura.',
    'customerOrder.title': 'Confirmación del pedido',
    'customerOrder.body':
      'Hola {{customerName}}, aquí tienes el resumen de tu pedido',
    'customerOrder.invoiceButton': 'Quiero mi factura',
    'productList.quantity': 'Cantidad',
    'productList.total': 'Total',
  },
  productConfig: {
    taxesLabel: 'TTC',
  },
} as Props;

export default CustomerOrder;
/* Only for email playground dev mode ⬆️ */
