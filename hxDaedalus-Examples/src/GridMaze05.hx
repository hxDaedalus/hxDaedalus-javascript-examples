
import hxDaedalus.ai.EntityAI;
import hxDaedalus.ai.PathFinder;
import hxDaedalus.ai.trajectory.LinearPathSampler;
import hxDaedalus.data.ConstraintSegment;
import hxDaedalus.data.Edge;
import hxDaedalus.data.Mesh;
import hxDaedalus.data.Object;
import hxDaedalus.data.math.Point2D;
import hxDaedalus.data.math.RandGenerator;
import hxDaedalus.data.Vertex;
import hxDaedalus.factories.RectMesh;
import hxDaedalus.view.SimpleView;
import hxDaedalus.graphics.TargetCanvas;
import js.Browser;
//import js.Browser.document;
import js.html.Event;
import js.html.MouseEvent;
import js.html.KeyboardEvent;

typedef UpDownEvent = Event;

class GridMaze05 {
    var mesh: 			Mesh;
    var view: 			SimpleView;
    var entityAI: 		EntityAI;
    var pathfinder: 	PathFinder;
    var path : 			Array<Float>;
    var pathSampler: 	LinearPathSampler;
    var newPath:		Bool = false;
	var rows:			Int = 15;
	var cols:			Int = 15;
    var mx: 			Float;
    var my: 			Float;
	var targetCanvas: 	TargetCanvas;

    public static function main(): Void {
		new GridMaze05();
    }

    public function new() {

        mesh = RectMesh.buildRectangle( 600, 600 ); // build a rectangular 2 polygons mesh of 600x600
		targetCanvas = new TargetCanvas();// uses svg if -D svg set
        view = new SimpleView(targetCanvas);	// create a viewport
		GridMaze.generate( 600, 600, cols, rows );
		mesh.insertObject( GridMaze.object );
		var v = view;
		var rad = 10;
		v.constraintsWidth = 4;
		v.edgesWidth = .5;
        v.drawMesh( mesh );
        entityAI = new EntityAI(); // we need an entity
        entityAI.radius = rad; // set radius as size for your entity
        entityAI.x = GridMaze.tileWidth / 2; // set a position
        entityAI.y = GridMaze.tileHeight / 2;
        view.drawEntity( entityAI ); // show entity on screen
        pathfinder = new PathFinder(); // now configure the pathfinder
        pathfinder.entity = entityAI;  // set the entity
        pathfinder.mesh = mesh;  // set the mesh
        path = new Array<Float>(); // we need a vector to store the path
        pathSampler = new LinearPathSampler(); // then configure the path sampler
        pathSampler.entity = entityAI;
        pathSampler.samplingDistance = 12;
        pathSampler.path = path;
		#if svg
        var bc = targetCanvas.svgElement;
        #else
        var bc = targetCanvas.canvas;
        #end
        bc.onmousedown = onMouseDown; // click/drag
        bc.onmouseup = onMouseUp;
        bc.onmousemove = onMouseMove;
        targetCanvas.onEnterFrame = onEnterFrame;// animate
		Browser.document.onkeydown = onKeyDown;// keypress
	}

    function onMouseMove( e: Event ): Void {
        var p: MouseEvent = cast e;
        mx = p.clientX;
        my = p.clientY;
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
            pathfinder.findPath( mx, my, path );// find path !
            view.drawPath( path ); // show path on screen
            pathSampler.reset(); // reset the path sampler to manage new generated path
        }
        if( pathSampler.hasNext ) pathSampler.next(); // animate ! move entity
		view.drawEntity(entityAI); // show entity position on screen
    }

    function onKeyDown( event: KeyboardEvent ): Void {
		if( event.keyCode == 32 ){ // SPACE
			reset( true );
			event.preventDefault();
		}else if( event.keyCode == 13 ){ // ENTER
			reset( false );
			event.preventDefault();
		}
    }

	function reset( newMaze: Bool = false ): Void {
		var seed = Std.int( Math.random() * 10000 + 1000 );
		if( newMaze ){
			mesh = RectMesh.buildRectangle( 600, 600 );
			GridMaze.generate( 600, 600, 30, 30, seed );
			var gridObject = GridMaze.object;
			gridObject.scaleX = .92;
			gridObject.scaleY = .92;
			gridObject.x = 23;
			gridObject.y = 23;
			mesh.insertObject( gridObject );
		}
        entityAI.radius = GridMaze.tileWidth * .27;
		var v = view;
		v.drawMesh( mesh, true );
		pathfinder.mesh = mesh;
		entityAI.x = GridMaze.tileWidth / 2;
		entityAI.y = GridMaze.tileHeight / 2;
		path = [];
		pathSampler.path = path;
	}
}
