'use client';

import { useEffect, useState } from 'react';
import { StreamChat, ChannelSort, ChannelFilters } from 'stream-chat';
import { ChannelList, Chat } from 'stream-chat-react';
import { Channel } from './Channel';
import { StreamTheme, StreamVideo, StreamVideoClient } from '@stream-io/video-react-sdk';
import { Video } from './Video';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import './layout.css';
import './styles/index.scss';
import ChannelListHeader from './ChannelListHeader';

export default function WhatsAppChat() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [videoClient, setVideoClient] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://127.0.0.1:8000/api/user/', {
          headers: {
            Authorization: `Token ${token}`,
            Accept: 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.error('Erreur lors de la requête');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserInfo();
  }, []);

  const apiKey = process.env.NEXT_PUBLIC_REACT_APP_STREAM_KEY || 'Set API Key';

  useEffect(() => {
    if (user) {
      const connectUser = async () => {
        try {
          const userId = user.id;
          const res = await fetch('http://127.0.0.1:8000/api/user/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: userId }),
          });
          const response = await res.json();
          console.log(response);

          const chatClient = StreamChat.getInstance(apiKey);
          await chatClient.connectUser({ id: userId }, response.userToken);

          const _videoClient = new StreamVideoClient({
            apiKey,
            user: chatClient.user,
            token: response.userToken,
          });
          await _videoClient.connectUser({ id: userId }, response.userToken);

          setVideoClient(_videoClient);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
        }
      };

      connectUser();
    }
  }, [user]);

  const sort: ChannelSort = { last_message_at: -1 };
  const filters: ChannelFilters = {
    type: 'messaging',
    members: { $in: [user?.id] },
  };

  return (
    <>
      {/* {isLoading && ( */}
        {/* <div className="text-white w-full flex items-center justify-center"> */}
          {/* <p>Loading…</p> */}
        {/* </div> */}
      {/* )} */}
      {/* {!isLoading && videoClient && ( */}
        <div id="root">
          <Chat client={StreamChat.getInstance(apiKey)}>
            <StreamVideo client={videoClient}>
              <StreamTheme as="main" className="main-container">
                <div className="channel-list-container">
                  {/* <ChannelListHeader user={videoClient.user} /> */}
                  <ChannelList sort={sort} filters={filters} showChannelSearch />
                </div>
                <Channel />
                <Video />
              </StreamTheme>
            </StreamVideo>
          </Chat>
        </div>
      {/* )} */}
    </>
  );
}