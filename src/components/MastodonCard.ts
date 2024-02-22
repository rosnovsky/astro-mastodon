import type { EmbedData } from "../types.js";

export const mastodonCard = (data: EmbedData): string => {
  const date = new Date(data.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `
    <aside class="w-2/3 mx-auto border-red-500">
      <div class="w-full h-full flex items-center justify-center px-5 py-5">
        <div class="w-full mx-auto rounded-lg border-2 border-violet-300  p-5 text-gray-800">
          <a
            href="${data.accountUrl}"
            target="_blank"
            class=" no-underline p-0 m-0 "
          >
            <div class="w-full flex mb-4">
              <div class="w-14 h-14">
                <img
                  src="${data.avatar}"
                  alt="${data.display_name}"
                  width="100"
                  height="100"
                  class="border-2 border-violet-700 object-cover w-full rounded-full"
                />
              </div>
              <div class="flex-col flex-grow pl-3">
                <p class="my-0 font-bold">${data.display_name}</p>
                <p class="text-xs text-gray-600 my-0">@${data.username}</p>
              </div>
              <div class="w-16 h-16 text-right text-violet-700">
                <?xml version="1.0" encoding="UTF-8"?>
                  <svg width="80px" height="80px" class="icon-tabler" viewBox="-9 0 274 274" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
                      <g>
                          <path d="M249.874103,164.084793 C246.121107,183.392442 216.260831,204.522765 181.966269,208.61788 C164.083135,210.751705 146.475762,212.712995 127.700462,211.851797 C96.9952088,210.444977 72.7666374,204.522765 72.7666374,204.522765 C72.7666374,207.511889 72.9509692,210.357972 73.3196328,213.019724 C77.3115222,243.322396 103.36719,245.137696 128.048481,245.984147 C152.959817,246.836498 175.141568,239.842212 175.141568,239.842212 L176.164978,262.363134 C176.164978,262.363134 158.740462,271.719816 127.700462,273.440737 C110.584149,274.381567 89.33143,273.010138 64.5778816,266.458249 C10.8916144,252.248479 1.65880329,195.021567 0.246084399,136.955576 C-0.184514679,119.715392 0.080923109,103.458802 0.080923109,89.8624885 C0.080923109,30.4870046 38.9837803,13.0831336 38.9837803,13.0831336 C58.5996328,4.07447005 92.258619,0.286082949 127.250693,0 L128.110416,0 C163.10249,0.286082949 196.783596,4.07447005 216.397974,13.0831336 C216.397974,13.0831336 255.299356,30.4870046 255.299356,89.8624885 C255.299356,89.8624885 255.787467,133.670046 249.874103,164.084793" fill="currentColor">

                  </path>
                          <path d="M209.412536,94.4687189 L209.412536,166.362544 L180.929587,166.362544 L180.929587,96.5818986 C180.929587,81.8722212 174.740462,74.4060461 162.360739,74.4060461 C148.672997,74.4060461 141.812905,83.2628203 141.812905,100.775816 L141.812905,138.970839 L113.498066,138.970839 L113.498066,100.775816 C113.498066,83.2628203 106.636499,74.4060461 92.9487572,74.4060461 C80.5690337,74.4060461 74.3799093,81.8722212 74.3799093,96.5818986 L74.3799093,166.362544 L45.89696,166.362544 L45.89696,94.4687189 C45.89696,79.7752627 49.6381581,68.0989493 57.1529968,59.460424 C64.9023056,50.8218986 75.050877,46.3935115 87.6488494,46.3935115 C102.224333,46.3935115 113.262121,51.9957235 120.560186,63.2016221 L127.654748,75.0947097 L134.750785,63.2016221 C142.047375,51.9957235 153.085163,46.3935115 167.662121,46.3935115 C180.258619,46.3935115 190.40719,50.8218986 198.157974,59.460424 C205.671338,68.0989493 209.412536,79.7752627 209.412536,94.4687189" fill="#FFFFFF">

                  </path>
                      </g>
                  </svg>
              </div>
            </div>
          </a>
          <div class="w-full mb-4">
            <div class="prose prose-md">
              ${data.content}
            </div>
          </div>
          <div class="w-full align-baseline">
            <div class="flex text-xs justify-between text-gray-500 text-right">
              <div class="w-1/2 flex justify-between">
                <p>
                  Favs:
                  <span class="font-bold">${data.favourites_count}</span>
                </p>
                <p>
                  Reblogs:
                  <span class="font-bold">${data.reblogs_count}</span>
                </p>
                <p>
                  Replies:
                  <span class="font-bold">${data.replies_count}</span>
                </p>
              </div>
              <a class="my-3" href="${data.url}" target="_blank">
                ${date}
              </a>
            </div>
          </div>
        </div>
      </div>
    </aside>
  `;
};
