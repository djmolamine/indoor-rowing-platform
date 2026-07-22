import { notFound, redirect } from "next/navigation";
import { RegistrationFlow } from "@/components/events/registration-flow";
import { eventBySlug } from "@/lib/events/data";

export default async function RegisterPage({params}:{params:Promise<{slug:string}>}){const event=eventBySlug((await params).slug);if(!event)notFound();if(event.commerceMode==="external_registration"&&event.externalRegistrationUrl)redirect(event.externalRegistrationUrl);if(event.commerceMode!=="rowform_registration")redirect(`/events/${event.slug}`);return <RegistrationFlow event={event}/>}
