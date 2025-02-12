/**
 * This is a reuseable avatar component.
 * Props:
 * -SvgAvatar: this is the svg format of the avatar to be used.
 * -size: This prop determines the size of the avatar.
 */

const sizeVariant = {
  md: 'w-12 h-12 p-[4px]',
  sm: 'w-8 h-8 p-[4px]',
  xs: 'h-6 w-6 p-[2px]',
};

interface Props {
  SvgAvatar: any;
  size?: keyof typeof sizeVariant;
}

export default function UiAvatar({ SvgAvatar, size = 'md' }: Props) {
  return (
    <div
      className={` bg-avatar-gradient-primary !rounded-full backdrop-blur-[6.2px] ${sizeVariant[size]}`}
    >
      <div className="ui-avatar w-full h-full !rounded-full">
        <SvgAvatar />
      </div>
    </div>
  );
}
