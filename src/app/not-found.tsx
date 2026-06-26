import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Container className="text-center">
        <h1 className="text-6xl font-extrabold text-ink mb-4">404</h1>
        <p className="text-lg text-ink-soft mb-8">Page not found. Let&apos;s get you back on track.</p>
        <Button href="/" variant="primary">
          Return to Home
        </Button>
      </Container>
    </div>
  );
}
