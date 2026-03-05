# AMCABI Turismo - Documentación de Entrega

## URLs del Proyecto

| Recurso | URL |
|---------|-----|
| **Sitio público** | https://amcabi-turismo.vercel.app |
| **Panel de administración (Sanity Studio)** | https://amcabi-turismo.vercel.app/studio |
| **Gestión del proyecto Sanity** | https://www.sanity.io/manage/project/swjzxh2m |
| **Código fuente (GitHub)** | https://github.com/JuanMBasile/amcabi-turismo |
| **Dashboard de Vercel** | https://vercel.com/juanmartinnts-gmailcoms-projects/amcabi-turismo |

---

## Sanity CMS

### Datos del proyecto

```
Project ID: swjzxh2m
Dataset: production
```

### Acceso al Studio

**URL:** https://amcabi-turismo.vercel.app/studio

El Studio está embebido en el sitio. Los usuarios pueden:
1. Ir a la URL del studio
2. Click en "Sign in with Google" o "Sign in with Email"
3. Crear cuenta con su email
4. Esperar aprobación del administrador

### Roles y permisos en Sanity

| Rol | Permisos | Uso recomendado |
|-----|----------|-----------------|
| **Administrator** | Control total: schemas, miembros, billing, eliminar proyecto | Solo el desarrollador |
| **Editor** | Crear, editar, publicar y eliminar documentos | El cliente / dueño del negocio |
| **Viewer** | Solo lectura de documentos | Consultas, auditorías |
| **Developer** | Editor + acceso a API tokens y webhooks | Desarrolladores adicionales |

### Cómo agregar un nuevo miembro

1. Ir a https://www.sanity.io/manage/project/swjzxh2m
2. Click en **"Members"** en el menú lateral
3. Click en **"Invite member"**
4. Ingresar email del nuevo usuario
5. Seleccionar rol (recomendado: **Editor** para el cliente)
6. El usuario recibe email de invitación

### Contenido administrable en Sanity

| Sección | Descripción | Campos principales |
|---------|-------------|-------------------|
| **Destinos** | Lugares de viaje (Bariloche, Cataratas, etc.) | Nombre, slug, descripción, imagen, galería, highlights |
| **Salidas** | Fechas de viaje con precios | Destino, fecha, precio, hotel, noches, disponibilidad |
| **Promociones** | Banners del carrusel de la home | Imagen, título, badge, destinos relacionados, CTA |
| **Servicios** | Lista de servicios incluidos | Título, descripción, ícono |
| **FAQs** | Preguntas frecuentes | Pregunta, respuesta, orden |
| **Reservas** | Reservas recibidas (solo lectura) | Cliente, destino, fecha, estado, número de reserva |
| **Vouchers** | Vouchers generados | Código, reserva asociada, fecha |
| **Configuración del sitio** | Toggles de secciones | Mostrar/ocultar: BookingBar, Promos, Destinos, WhyUs |

---

## Vercel

### Variables de entorno configuradas

| Variable | Descripción |
|----------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ID del proyecto Sanity (swjzxh2m) |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset de Sanity (production) |
| `SANITY_REVALIDATE_SECRET` | Secret para webhook de revalidación |
| `SANITY_WRITE_TOKEN` | Token para crear reservas en Sanity |
| `ADMIN_SECRET` | Secret para panel de admin interno |

### Cómo agregar/editar variables de entorno

1. Ir a https://vercel.com/juanmartinnts-gmailcoms-projects/amcabi-turismo
2. Click en **"Settings"**
3. Click en **"Environment Variables"**
4. Agregar o editar la variable
5. **Importante:** Hacer redeploy para que tome efecto

### Dominio personalizado

Para conectar el dominio `amcabiturismo.com.ar`:

1. En Vercel → Settings → Domains
2. Agregar `amcabiturismo.com.ar`
3. Configurar DNS en el registrador del dominio:
   - Tipo: `A` → `76.76.21.21`
   - Tipo: `CNAME` → `cname.vercel-dns.com`

---

## GitHub

### Repositorio

**URL:** https://github.com/JuanMBasile/amcabi-turismo

### GitHub Actions configurados

| Workflow | Trigger | Descripción |
|----------|---------|-------------|
| `claude.yml` | PRs, comentarios @claude | Code review automático con Claude |
| `claude-fix.yml` | Comentario `/fix` en PR | Auto-fix de código con Claude |

### Secrets requeridos en GitHub

Para que funcionen los workflows de Claude:

1. Ir a Settings → Secrets and variables → Actions
2. Agregar:
   - `ANTHROPIC_API_KEY`: API key de Anthropic

---

## Flujo de trabajo recomendado

### Para el cliente (día a día)

1. **Agregar un destino nuevo:**
   - Studio → Destinos → Create
   - Completar campos → Publish
   - El sitio se actualiza automáticamente

2. **Crear una salida/fecha de viaje:**
   - Studio → Salidas → Create
   - Seleccionar destino, fecha, precio
   - Publish → aparece en el buscador

3. **Agregar una promoción:**
   - Studio → Promos → Create
   - Subir imagen, elegir badge (PREVENTA, OFERTA, etc.)
   - Publish → aparece en el carrusel

4. **Ver reservas:**
   - Studio → Reservas
   - Ver estado, datos del cliente
   - (Las reservas llegan por email también)

### Para el desarrollador (mantenimiento)

1. **Actualizar código:**
   ```bash
   git pull origin main
   npm install
   npm run dev
   # hacer cambios
   npm run build && npm run lint
   git add . && git commit -m "feat: descripción"
   git push origin main
   ```

2. **Deploy manual:**
   ```bash
   npx vercel --prod
   ```

3. **Ver logs de producción:**
   ```bash
   npx vercel logs amcabi-turismo.vercel.app
   ```

---

## Credenciales y accesos

### Sanity

```
Panel de gestión: https://www.sanity.io/manage/project/swjzxh2m
Project ID: swjzxh2m
Dataset: production
```

### Vercel

```
Dashboard: https://vercel.com/juanmartinnts-gmailcoms-projects/amcabi-turismo
Cuenta: juanmartinnts@gmail.com
```

### GitHub

```
Repositorio: https://github.com/JuanMBasile/amcabi-turismo
```

---

## Checklist de entrega al cliente

- [ ] Crear cuenta de Sanity para el cliente (rol: Editor)
- [ ] Enviar email con URLs y credenciales
- [ ] Demo de 15 minutos del Studio
- [ ] Configurar dominio personalizado (si aplica)
- [ ] Entregar informe de auditoría (Word)
- [ ] Configurar emails de reserva (SMTP)

---

## Soporte y contacto

**Desarrollador:** Juan Martín Basile
**Email:** juanmartinnts@gmail.com
**GitHub:** @JuanMBasile

---

## Notas técnicas

### Stack tecnológico

- **Framework:** Next.js 16.1 (App Router)
- **UI:** React 19.2 + Tailwind CSS 4.1
- **Lenguaje:** TypeScript 5.9
- **CMS:** Sanity v3
- **Hosting:** Vercel
- **Repositorio:** GitHub

### Arquitectura

El sitio usa un patrón de "dual data source":
- Si Sanity está configurado → usa datos de Sanity
- Si no → usa datos estáticos de fallback (`app/data/`)

Esto permite que el sitio funcione incluso sin conexión a Sanity.

### Revalidación

El contenido se actualiza automáticamente cuando:
1. Se publica un cambio en Sanity
2. Sanity envía webhook a `/api/revalidate`
3. Next.js invalida el cache de las páginas afectadas
4. La próxima visita ve el contenido nuevo
