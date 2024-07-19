"use server";
import Image from "next/image";
import { Knock } from "@knocklabs/node";
import { getUserInfo } from "@/app/services";

const knock = new Knock("sk_test_OVyVfRVZ79KkFSmAAZk3o3IrVbJmdDQRY0jgjoTOXxc");

export async function getStaticProps() {
  const user = await getUserInfo(); 

  return {
    props: {
      user,
    },
  };
}


async function Notifications({ user }) {


  await knock.workflows.trigger('invoice-created', {
    data: {
      name,
      email,
      description,
      value,
      url: invoicePath,
    },
    recipients: [
      {
        id: user.id,
        name: user?.firstName || '',
        email: user?.emailAddresses.find(email => email.id === user.primaryEmailAddressId)?.emailAddress,
      }
    ],
  });

  return (
    <div className="mt-24">
      <h1>Notifications</h1>
    {/* <button onClick={sendNotification}>Trigger Notification</button> */}
    </div>

  );
}

export default Notifications;