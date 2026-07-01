import LandingPage from './components/LandingPage';
import EcosystemWrapper from './components/EcosystemWrapper';

export const metadata = {
  title: 'AirPure X | Công nghệ lọc không khí lượng tử AI',
  description: 'Trải nghiệm đỉnh cao công nghệ lọc không khí với AirPure X. Tái định nghĩa sự thuần khiết cho không gian sống của bạn.',
  openGraph: {
    title: 'AirPure X - Không khí sạch tuyệt đối',
    description: 'Bảo vệ sức khỏe gia đình bạn với màng lọc lượng tử và trí tuệ nhân tạo.',
    images: ['https://i.postimg.cc/9QXMQkTV/Philips-Air-Purifier-Series-3000i.png'],
  },
};

export default function Home() {
  return (
    <LandingPage
      ecosystemComponent={<EcosystemWrapper />}
    />
  );
}
