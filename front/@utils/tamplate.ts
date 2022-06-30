import styles from '@/scss/searchMap.module.scss';
import { Dispatch, SetStateAction } from 'react';
import { userIcon } from './svg';

export const overlayContainer = ({
  name,
  address,
  addressRoad,
}: {
  name: string;
  address: string;
  addressRoad: string;
}) => {
  const container = `
  <div class=${styles.contentArrow}>
    <span class=${styles.arrow} />
  </div>
  <div class=${styles.contentInner}>
    <div class=${styles.inner}>
      <div class=${styles.innerTitle}>
        ${name}
      </div>
      <div class=${styles.innerBody}>
        ${addressRoad}(${address})
      </div>
    </div>
  </div>`;
  return container;
};

export const avatarContainer = (
  member: any[],
  avatarClick: (id: number) => void,
  handler: () => void
) => {
  const avatarGroup = document.createElement('div');
  avatarGroup.className = `${styles.avatarGroup}`;

  const anticon = document.createElement('a');
  anticon.className = `${styles.anticon}`;
  anticon.innerHTML = userIcon;

  if (member?.length >= 3) {
    const plusAvatar = document.createElement('a');
    plusAvatar.className = `${styles.plusAvatar}`;
    plusAvatar.innerText = `+ ${member.length - 2}`;
    plusAvatar.addEventListener('click', handler);
    member?.forEach((user, i) => {
      const avatar = document.createElement('a');
      avatar.className = `${styles.avatar}`;
      avatar.addEventListener('click', () => avatarClick(user.id));
      if (i <= 2) {
        if (user.Image) {
          const avatarImage = document.createElement('img');
          avatarImage.className = `${styles.avatarImage}`;
          avatarImage.src = user.Image?.src;
          avatar.appendChild(avatarImage);
        } else {
          avatar.appendChild(anticon);
        }
        avatarGroup.appendChild(avatar);
      }
    });
    avatarGroup.appendChild(plusAvatar);
  } else {
    member.forEach((user) => {
      const avatar = document.createElement('a');
      avatar.className = `${styles.avatar}`;
      avatar.addEventListener('click', () => avatarClick(user.id));
      if (user.Image) {
        const avatarImage = document.createElement('img');
        avatarImage.className = `${styles.avatarImage}`;
        avatarImage.src = user.Image?.src;
        avatar.appendChild(avatarImage);
      } else {
        avatar.appendChild(anticon);
      }
      avatarGroup.appendChild(avatar);
    });
  }
  return avatarGroup;
};
