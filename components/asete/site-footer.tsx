export function SiteFooter() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-3xl tracking-[0.18em] text-primary">
                ASETE
              </span>
              <span className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">
                Advisory
              </span>
            </div>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
              Estruturação patrimonial e financeira para empresários,
              investidores e famílias que valorizam visão de longo prazo.
            </p>
          </div>

          <div className="lg:col-span-2 lg:col-start-7">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              Navegação
            </p>
            <ul className="mt-5 space-y-3 text-sm text-foreground/85">
              <li>
                <a href="/#sobre" className="hover:text-primary">
                  Sobre
                </a>
              </li>
              <li>
                <a href="/#pilares" className="hover:text-primary">
                  Pilares
                </a>
              </li>
              <li>
                <a href="/#como-atuamos" className="hover:text-primary">
                  Como Atuamos
                </a>
              </li>
              <li>
                <a href="/jornada" className="hover:text-primary">
                  Jornada
                </a>
              </li>
              <li>
                <a href="/#diferenciais" className="hover:text-primary">
                  Diferenciais
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              CIISC
            </p>
            <ul className="mt-5 space-y-3 text-sm text-foreground/85">
              <li>Consultoria</li>
              <li>Investimentos</li>
              <li>Imóveis</li>
              <li>Seguros</li>
              <li>Consórcios</li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              Contato
            </p>
            <ul className="mt-5 space-y-3 text-sm text-foreground/85">
              <li>wealth@aseteadvisory.com</li>
              <li>
                R. Min. Calógeras, 343 - Bucarein, Joinville - SC, 89221-031
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} ASETE Advisory. Todos os direitos
            reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary">
              Política de Privacidade
            </a>
            <a href="#" className="hover:text-primary">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
