/**
 * This is a reuseable avatar component.
 * Props:
 * -SvgAvatar: this is the svg format of the avatar to be used.
 * -size: This prop determines the size of the avatar.
 */

const sizeVariant = {
  md: 'w-10 h-10',
  sm: 'w-8 h-8'
}

interface Props {
  SvgAvatar: any;
  size?: keyof typeof sizeVariant;
}

export default function UiAvatar({ SvgAvatar, size= 'md' }: Props) {
  return (
    <div 
      className={`p-[4px] bg-avatar-gradient-primary rounded-full backdrop-blur-[6.2px] ${sizeVariant[size]}`}
      >
      <div className="w-full h-full">
      <SvgAvatar/>
      </div>
    </div>
  )
}

