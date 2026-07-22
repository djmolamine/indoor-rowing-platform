begin;

create table public.machine_providers (
  key text primary key check (key ~ '^[a-z0-9][a-z0-9-]*$'),
  display_name text not null unique,
  active boolean not null default true,
  supported_machine_classes text[] not null default '{}',
  connection_capabilities text[] not null default '{}',
  ranking_comparability text not null,
  official_verification_capability boolean not null default false,
  icon_reference text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.machine_provider_aliases (
  normalized_alias text primary key,
  provider_key text not null references public.machine_providers(key) on delete cascade,
  source_label text not null,
  created_at timestamptz not null default now()
);

alter table public.machine_models add column key text unique;
alter table public.machine_models add column provider_key text references public.machine_providers(key) on delete restrict;
alter table public.machine_models add column suggested_machine_class text;
alter table public.machine_models add column active boolean not null default true;

create table public.machine_comparability_rules (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  provider_key text references public.machine_providers(key) on delete cascade,
  machine_model_key text,
  machine_class text,
  outcome text not null check (outcome in ('same_model','same_provider_class','cross_provider_comparable','participation_only','excluded')),
  authority text not null,
  rule_version text not null,
  event_override_allowed boolean not null default true,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.workouts add column machine_provider_key text references public.machine_providers(key) on delete set null;
alter table public.workouts add column machine_model_key text;
alter table public.workouts add column machine_class text;
alter table public.workouts add column other_machine_brand text;
alter table public.workouts add column other_machine_model text;
alter table public.workouts add column connection_method text;
alter table public.workouts add column verification_tier text;

alter table public.ranking_definitions add column machine_provider_key text references public.machine_providers(key) on delete set null;
alter table public.ranking_definitions add column machine_model_key text;
alter table public.ranking_entries add column machine_provider_key text references public.machine_providers(key) on delete set null;
alter table public.ranking_entries add column machine_model_key text;
alter table public.ranking_entries add column machine_class text;

create trigger machine_providers_set_updated_at before update on public.machine_providers for each row execute procedure public.set_updated_at();
alter table public.machine_providers enable row level security;
alter table public.machine_provider_aliases enable row level security;
alter table public.machine_comparability_rules enable row level security;
create policy "machine_providers_read_active" on public.machine_providers for select using (active);
create policy "machine_provider_aliases_read" on public.machine_provider_aliases for select using (true);
create policy "machine_comparability_rules_read_active" on public.machine_comparability_rules for select using (active);

insert into public.machine_providers(key,display_name,supported_machine_classes,connection_capabilities,ranking_comparability,official_verification_capability) values
 ('concept2','Concept2',array['static-air-resistance','dynamic-air-resistance'],array['manual','photo-ocr','file-import','bluetooth','local-device','cloud-api'],'model-specific',true),
 ('rp3','RP3',array['dynamic-air-resistance'],array['manual','photo-ocr','file-import','bluetooth','local-device'],'provider-class',false),
 ('waterrower','WaterRower',array['water-resistance'],array['manual','photo-ocr','file-import','bluetooth','cloud-api'],'participation-only',false),
 ('technogym','Technogym',array['hybrid-resistance'],array['manual','photo-ocr','bluetooth','cloud-api'],'provider-class',false),
 ('matrix','Matrix',array['magnetic'],array['manual','photo-ocr','bluetooth'],'provider-class',false),
 ('life-fitness','Life Fitness',array['magnetic'],array['manual','photo-ocr','bluetooth'],'provider-class',false),
 ('nordictrack','NordicTrack',array['magnetic'],array['manual','photo-ocr','bluetooth','cloud-api'],'provider-class',false),
 ('hydrow','Hydrow',array['magnetic'],array['manual','photo-ocr','cloud-api'],'provider-class',false),
 ('aviron','Aviron',array['magnetic'],array['manual','photo-ocr','cloud-api'],'provider-class',false),
 ('peloton-row','Peloton Row',array['magnetic'],array['manual','photo-ocr','cloud-api'],'provider-class',false),
 ('ergatta','Ergatta',array['water-resistance'],array['manual','photo-ocr','bluetooth','cloud-api'],'participation-only',false),
 ('domyos','Domyos',array['magnetic','hybrid-resistance'],array['manual','photo-ocr','bluetooth'],'provider-class',false),
 ('stairmaster','StairMaster',array['air-resistance'],array['manual','photo-ocr'],'provider-class',false),
 ('other','Other',array['static-air-resistance','dynamic-air-resistance','water-resistance','air-resistance','magnetic','hybrid-resistance','unknown'],array['manual','photo-ocr','file-import','bluetooth'],'participation-only',false),
 ('unknown','Unknown',array['unknown'],array['manual'],'unknown-excluded',false);

insert into public.machine_provider_aliases(normalized_alias,provider_key,source_label) values
 ('concept2','concept2','Concept2'),('concepttwo','concept2','ConceptTwo'),('c2','concept2','C2'),('conceptii','concept2','Concept II'),
 ('rp3','rp3','RP3'),('waterrower','waterrower','Water Rower'),('technogym','technogym','TechnoGym'),('matrixfitness','matrix','Matrix Fitness'),
 ('lifefitness','life-fitness','LifeFitness'),('nordictrack','nordictrack','Nordic Track'),('peloton','peloton-row','Peloton'),('decathlondomyos','domyos','Decathlon Domyos'),('stairmaster','stairmaster','Stair Master');

insert into public.machine_models(key,manufacturer,model_name,provider_key,suggested_machine_class) values
 ('concept2-rowerg','Concept2','RowErg','concept2','static-air-resistance'),('concept2-model-d','Concept2','Model D','concept2','static-air-resistance'),('concept2-model-e','Concept2','Model E','concept2','static-air-resistance'),('concept2-dynamic','Concept2','Dynamic Indoor Rower','concept2','dynamic-air-resistance'),
 ('rp3-model-s','RP3','RP3 Model S','rp3','dynamic-air-resistance'),('rp3-model-t','RP3','RP3 Model T','rp3','dynamic-air-resistance'),
 ('waterrower-original','WaterRower','Original Series','waterrower','water-resistance'),('waterrower-performance','WaterRower','Performance Ergometer','waterrower','water-resistance'),('waterrower-smartrow','WaterRower','SmartRow-equipped WaterRower','waterrower','water-resistance'),
 ('technogym-skillrow','Technogym','Skillrow','technogym','hybrid-resistance'),('matrix-rower','Matrix','Rower','matrix','magnetic'),('matrix-rower-02','Matrix','Rower-02','matrix','magnetic'),
 ('hydrow-rower','Hydrow','Hydrow','hydrow','magnetic'),('hydrow-wave','Hydrow','Hydrow Wave','hydrow','magnetic'),('aviron-impact','Aviron','Impact Series','aviron','magnetic'),('aviron-strong','Aviron','Strong Series','aviron','magnetic'),
 ('peloton-row','Peloton Row','Peloton Row','peloton-row','magnetic'),('peloton-row-plus','Peloton Row','Peloton Row+','peloton-row','magnetic'),('ergatta-rower','Ergatta','Ergatta Rower','ergatta','water-resistance'),('ergatta-lite','Ergatta','Ergatta Lite','ergatta','water-resistance')
on conflict (manufacturer,model_name) do update set key=excluded.key,provider_key=excluded.provider_key,suggested_machine_class=excluded.suggested_machine_class,active=true;

insert into public.machine_comparability_rules(key,provider_key,machine_class,outcome,authority,rule_version) values
 ('concept2-model-specific','concept2','static-air-resistance','same_model','Rowform','2026-07-22'),
 ('rp3-dynamic-separate','rp3','dynamic-air-resistance','same_provider_class','Rowform','2026-07-22'),
 ('water-provider-only','waterrower','water-resistance','participation_only','Rowform','2026-07-22'),
 ('unknown-excluded','unknown','unknown','excluded','Rowform','2026-07-22');

commit;
