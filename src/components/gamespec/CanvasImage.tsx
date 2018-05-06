import { Image, KonvaNodeProps } from 'react-konva';
import * as React from 'react';
import * as Konva from 'konva';

// try drag& drop rectangle
interface CanvasImageProps extends KonvaNodeProps {
  src: string;
  width: number;
  height: number;
  offsetX?: number;
  offsetY?: number;
  onClick?: (e: React.MouseEvent<{}>) => void;
  onTouchStart?: (e: React.TouchEvent<{}>) => void;
  onTouchEnd?: (e: React.TouchEvent<{}>) => void;
  x?: number;
  y?: number;
  rotation?: number;
  draggable?: boolean;
  onDragStart?: (e: React.SyntheticEvent<{}>) => void;
  onDragEnd?: (e: React.SyntheticEvent<{}>) => void;
}

interface CanvasImageState {
  image: any;
}

declare global {
  interface Window { Image: any; }
}

class CanvasImage extends React.Component<CanvasImageProps, CanvasImageState> {
  imageNode: Konva.Image = null as any;

  constructor(props: CanvasImageProps) {
    super(props);
    this.state = {
      image: null
    };
  }

  componentDidMount() {
    this.setImage();
  }

  componentWillReceiveProps(nextProps: CanvasImageProps) {
    const image = new window.Image();
    image.crossOrigin = 'Anonymous';
    image.onload = () => {
      this.setState({
        image: image
      });
      this.imageNode.cache();
      this.imageNode.drawHitFromCache(0);
    };
    image.src = nextProps.src;
  }

  setImage = () => {
    const image = new window.Image();
    image.crossOrigin = 'Anonymous';
    image.src = this.props.src;
    image.onload = () => {
      this.setState({
        image: image
      });
      this.imageNode.cache();
      this.imageNode.drawHitFromCache(0);
    };
  }

  render() {
    return (
      <Image
        ref={(node: any) => {
          if (node !== null) {
            this.imageNode = node;
          }
          return 'image';
        }}
        {...this.props}
        image={this.state.image}
      />
    );
  }
}

export default CanvasImage;
