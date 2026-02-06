import { checkout, type Checkout } from '#backend/pods/checkout';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

export const useCheckout = () => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (payload: Checkout) => checkout({ data: payload }),
    onSuccess: (response) => {
      if (response.url) {
        window.location.href = response.url;
      } else {
        navigate({ to: '/checkout/cancel' });
      }
    },
    onError: () => {
      navigate({ to: '/checkout/cancel' });
    },
  });

  return {
    checkout: mutation,
  };
};
