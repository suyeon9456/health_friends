import styles from '@/scss/searchMap.module.scss';
import { userIcon } from './svg';

export const overlayContainer = ({
  name,
  address,
}: {
  name: string;
  address: string;
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
        ${address}
      </div>
    </div>
  </div>`;
  return container;
};

export const avatarContainer = (member: any[]) => {
  console.log(member);
  const avatarGroup = document.createElement('div');
  avatarGroup.className = `${styles.avatarGroup}`;

  const anticon = document.createElement('a');
  anticon.className = `${styles.anticon}`;
  anticon.innerHTML = userIcon;
  anticon.addEventListener('click', () => {
    console.log('click');
  });

  if (member?.length > 3) {
    const plusAvatar = document.createElement('span');
    plusAvatar.className = `${styles.plusAvatar}`;
    plusAvatar.innerText = `+ ${member.length - 3}`;
    member?.forEach((user, i) => {
      const avatar = document.createElement('span');
      avatar.className = `${styles.avatar}`;
      if (i <= 3) {
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
      const avatar = document.createElement('span');
      avatar.className = `${styles.avatar}`;
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
