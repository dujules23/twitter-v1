import { getProviders, signIn } from "next-auth/react";

export default function signin({ providers }) {
  return (
    <div className="flex justify-center mt-44 space-x-4">
      <img
        src="https://d4y70tum9c2ak.cloudfront.net/contentImage/cp-xkfWuQLB8A-LnxHmXAXyjr697tiDTJ-H-hSl1VjA/resized.png"
        alt="phone-image"
        className="hidden object-cover md:w-70 md:h-60 md:inline-flex"
      />
      <div className="">
        {Object.values(providers).map((provider) => (
          <div key={provider.id} className="flex flex-col items-center">
            <img
              className="w-36 object-cover"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/X_logo_2023.svg/640px-X_logo_2023.svg.png"
              alt=""
            />
            <p className="text-center text-sm italic my-10">
              This app is created for learning purposes
            </p>
            <button
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              className="bg-red-400 rounded-lg p-3 text-white hover:bg-red-500"
            >
              Sign In with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
