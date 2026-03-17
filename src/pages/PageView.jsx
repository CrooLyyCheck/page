import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SectionRenderer from "../components/SectionRenderer";

const cmsUrl = import.meta.env.VITE_CMS_URL || "http://localhost:1337";

function resolveSlug(routeSlug, explicitSlug) {
  if (explicitSlug) {
    return explicitSlug;
  }
  return routeSlug || "home";
}

export default function PageView({ slug: explicitSlug }) {
  const { slug: routeSlug } = useParams();
  const slug = resolveSlug(routeSlug, explicitSlug);
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setLoading(true);
      setError(null);
      try {
        const url = new URL(`${cmsUrl}/api/pages`);
        url.searchParams.set("filters[slug][$eq]", slug);
        url.searchParams.set("populate[sections][populate]", "*");
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`CMS request failed (${response.status})`);
        }
        const body = await response.json();
        const first = body?.data?.[0] || null;
        if (!cancelled) {
          setPage(first);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Unknown error");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return <main className="container">Ladowanie strony...</main>;
  }

  if (error) {
    return <main className="container">Blad: {error}</main>;
  }

  if (!page) {
    return (
      <main className="container">
        <h1>Brak strony dla slug: {slug}</h1>
        <p>Utworz wpis w Strapi o tym slug.</p>
      </main>
    );
  }

  const sections = page.sections || [];

  return (
    <main className="container">
      <header className="block">
        <h1>{page.title}</h1>
        {page.seoDescription ? <p>{page.seoDescription}</p> : null}
      </header>
      {sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </main>
  );
}
