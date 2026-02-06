import { ProductList, type Product } from '#emails/pods/products';
import { fetchSiteConfig, type SiteConfig } from '#emails/pods/site-config';
import {
  fetchTranslations,
  type EmailTranslations,
} from '#emails/pods/translations';
import * as email from '@react-email/components';
import { Button, Head, Header, Root } from '../../common/components';

interface Props {
  customerName: string;
  products: Product[];
  totalAmount: number;
  translations: EmailTranslations;
  siteConfig?: SiteConfig;
}

const CustomerOrder = (props: Props) => {
  const { customerName, products, totalAmount, translations, siteConfig } =
    props;

  return (
    <Root siteConfig={siteConfig}>
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
          <email.Hr className="border-gray-200 my-4" />
          <ProductList products={products} className="mt-5" />
          <email.Section>
            <email.Row>
              <email.Column align="right">
                <email.Text className="text-sm text-text/60 mb-1">
                  {translations['productList.total']}
                </email.Text>
                <email.Text className="text-2xl font-bold text-text m-0">
                  {totalAmount?.toFixed(2)} €
                </email.Text>
              </email.Column>
            </email.Row>
          </email.Section>

          <email.Section className="text-center mt-8">
            <Button href={'stripeInvoiceUrl'} variant="secondary">
              {translations['customerOrder.invoiceButton']}
            </Button>
          </email.Section>
        </email.Container>
      </email.Body>
    </Root>
  );
};

export const customerOrderEmail = {
  getHtml: async (props: Omit<Props, 'translations'>) => {
    const [translations, siteConfig] = await Promise.all([
      fetchTranslations(),
      fetchSiteConfig(),
    ]);
    await email.render(
      <CustomerOrder
        {...props}
        translations={translations}
        siteConfig={siteConfig}
      />
    );
  },
};

/* Only for email playground dev mode ⬇️ */
CustomerOrder.PreviewProps = {
  customerName: 'Marin',
  products: [
    {
      id: '1',
      name: 'Avocat Hass - 1kg',
      quantity: 2,
      price: 6.5,
      priceLabel: '6.50 € TTC / unité',
      totalPriceLabel: '13.00 €',
      imageUrl:
        'https://prod-content-island.s3.eu-west-3.amazonaws.com/landalousie/landalousie/product/avocat-hass-%F0%9F%A5%91/fr/466dc113-b1f8-4729-886a-c15f065f32f5.jpg',
    },
    {
      id: '2',
      name: "Huile d'olive vierge extra",
      quantity: 1,
      price: 50.0,
      priceLabel: '50.00 € TTC / unité',
      totalPriceLabel: '50.00 €',
      imageUrl:
        'https://prod-content-island.s3.eu-west-3.amazonaws.com/landalousie/landalousie/product/huile-d-olive-vierge-extra-3-litres-%F0%9F%92%9A/fr/36704279-4923-4cd7-966b-73136148e3c3.jpg',
    },
  ],
  totalAmount: 63.0,
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
} as Props;

export default CustomerOrder;
/* Only for email playground dev mode ⬆️ */
