const AnimatedOutline = async ({ font, text, color='#000', stroke }) => {
  const fontOT = await opentype.load(font);
  const path = fontOT.getPath(text);
  console.log(path)
  console.log()
  const svgPath = path.toPathData();
  const boundingBox = path.getBoundingBox();
  const strokeWidth = 2;
  const width = boundingBox.x2 - boundingBox.x1 + strokeWidth*2;
  const height = boundingBox.y2 - boundingBox.y1 + strokeWidth*2;
  const svg = (
    <svg
      fill='white'
      width={width}
      height={height}
      viewBox={`${boundingBox.x1-strokeWidth} ${boundingBox.y1-strokeWidth} ${width} ${height}`}
    >
      <motion.path 
        d={svgPath} 
        strokeWidth={strokeWidth} 
        stroke={color}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          repeatType: "reverse", 
          // ease: [0,.51,.33,.98]
          ease: [.42,.01,.53,1]
        }}
      />
    </svg>
  )
}

export default AnimatedOutline;