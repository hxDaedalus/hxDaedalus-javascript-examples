import hxDaedalus.ai.EntityAI;
import hxDaedalus.ai.PathFinder;
import hxDaedalus.ai.trajectory.LinearPathSampler;
import hxDaedalus.data.Mesh;
import hxDaedalus.data.Object;
import hxDaedalus.data.math.Point2D;
import hxDaedalus.data.math.RandGenerator;
import hxDaedalus.factories.RectMesh;
import hxDaedalus.view.SimpleView;
import wings.jsCanvas.BasicCanvas;
import wings.core.TargetCanvas;
import js.Browser;
import js.html.Event;
import js.html.MouseEvent;

typedef UpDownEvent = js.html.Event;

class Pathfinding03 {
    var mesh: 			Mesh;
    var view: 			SimpleView;
    var entityAI: 		EntityAI;
    var pathfinder: 	PathFinder;
    var path: 			Array<Float>;
    var pathSampler: 	LinearPathSampler;
    var newPath:		Bool = false;
    var x: 				Float;
    var y: 				Float;
	var targetCanvas: 	TargetCanvas;
    var scale:          Float = 1;

    public static function main(): Void {
		new Pathfinding03();
	}

    public function new(){
        // add white bg for svg, shows an example of scaling the svg.
        #if svg
            var bgCanvas = new TargetCanvas();
            var bgView = new SimpleView( bgCanvas );
            bgView.graphics.beginFill( 0xffffff, 1 );
            bgView.graphics.drawRect( 0, 0, 600, 600 );
            bgView.graphics.endFill();
            scale = 1.5;
            cast( bgCanvas, hxDaedalus.svg.BasicSvg ).scale = scale;
        #end
        mesh = RectMesh.buildRectangle( 600, 600 ); // build a rectangular 2 polygons mesh of 600x600
        targetCanvas = new TargetCanvas(); // uses svg if -D svg set

        // test svg scaling
        #if svg
        scale = 1.5;
        cast( targetCanvas, hxDaedalus.svg.BasicSvg ).scale = scale;
        #end

        view = new SimpleView( targetCanvas ); // create a viewport
        var randGen = new RandGenerator(); // pseudo random generator
        randGen.seed = 7259;  // put a 4 digits number here
        var object: Object;
        var shapeCoords: Array<Float>;
        for( i in 0...50 ){// populate mesh with many square objects
            object = new Object();
            shapeCoords = new Array<Float>();
            shapeCoords = 	[ -1, -1,  1, -1
							,  1, -1,  1,  1
							,  1,  1, -1,  1
							, -1,  1, -1, -1
							];
            object.coordinates = shapeCoords;
            randGen.rangeMin = 10;
            randGen.rangeMax = 40;
            object.scaleX = randGen.next();
            object.scaleY = randGen.next();
            randGen.rangeMin = 0;
            randGen.rangeMax = 1000;
            object.rotation = ( randGen.next() / 1000 ) * Math.PI / 2;
            randGen.rangeMin = 50;
            randGen.rangeMax = 600;
            object.x = randGen.next();
            object.y = randGen.next();
            mesh.insertObject( object );
        }
		view.drawMesh(mesh); // show result mesh on screen
        entityAI = new EntityAI(); // we need an entity
        entityAI.radius = 4; // set radius as size for your entity
        entityAI.x = 20; // set a position
        entityAI.y = 20; //
        view.drawEntity( entityAI );   // show entity on screen
        pathfinder = new PathFinder(); // now configure the pathfinder
        pathfinder.entity = entityAI;  // set the entity
        pathfinder.mesh = mesh;        // set the mesh
        path = new Array<Float>(); // we need a vector to store the path
        pathSampler = new LinearPathSampler(); // then configure the path sampler
        pathSampler.entity = entityAI;
        pathSampler.samplingDistance = 10;
        pathSampler.path = path;
        #if svg
            var bc = targetCanvas.svgElement;
        #else
            var bc = targetCanvas.canvas;
        #end
		bc.onmousedown = onMouseDown;// click/drag
        bc.onmouseup = onMouseUp;
        if( scale != 1 ) {
            bc.onmousemove = onMouseMoveScale;
        } else {
            bc.onmousemove = onMouseMove;
        }
		targetCanvas.onEnterFrame = onEnterFrame;// animate
	}

    function onMouseMove( e: Event ): Void {
        var p: MouseEvent = cast e;
        x = p.clientX;
        y = p.clientY;
    }

    function onMouseMoveScale( e: Event ): Void {
        var p: MouseEvent = cast e;
        x = p.clientX/scale;
        y = p.clientY/scale;
    }

    function onMouseUp( event: UpDownEvent ): Void {
		newPath = false;
    }

    function onMouseDown( event: UpDownEvent ): Void {
        newPath = true;
    }

    function onEnterFrame(): Void {
        if( newPath ){
			view.drawMesh( mesh, true );
			pathfinder.findPath( x, y, path ); // find path !
			view.drawPath( path ); // show path on screen
			pathSampler.reset(); // reset the path sampler to manage new generated path
        }
        if ( pathSampler.hasNext ) pathSampler.next(); // animate ! move entity
		view.drawEntity( entityAI ); // show entity position on screen
    }
}
