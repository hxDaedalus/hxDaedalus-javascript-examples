import hxDaedalus.data.ConstraintSegment;
import hxDaedalus.data.ConstraintShape;
import hxDaedalus.data.Mesh;
import hxDaedalus.data.Object;
import hxDaedalus.data.Vertex;
import hxDaedalus.factories.RectMesh;
import hxDaedalus.view.SimpleView;
import hxDaedalus.graphics.TargetCanvas;
import hxDaedalus.canvas.BasicCanvas;

class Basics01{
    var mesh: 			Mesh;
    var view : 			SimpleView;
    var object: 		Object;
	var targetCanvas: 	TargetCanvas;

    public static function main(): Void {
		new Basics01();
	}

    public function new(){
        // add white bg
        #if svg
            var basicCanvas = new BasicCanvas();
        #end
        mesh = RectMesh.buildRectangle( 600, 400 ); // build a rectangular 2 polygons mesh of 600x400
		targetCanvas = new TargetCanvas(); // create a viewport // uses svg if -D svg set
        view = new SimpleView( targetCanvas );

        // SINGLE VERTEX INSERTION / DELETION
        // insert a vertex in mesh at coordinates (550, 50)
        var vertex : Vertex = mesh.insertVertex( 550, 50 );
        // if you want to delete that vertex :
        //_mesh.deleteVertex(vertex);


        // SINGLE CONSTRAINT SEGMENT INSERTION / DELETION
        // insert a segment in mesh with end points (70, 300) and (530, 320)
        var segment : ConstraintSegment = mesh.insertConstraintSegment( 70, 300, 530, 320 );
        // if you want to delete that edge
        //_mesh.deleteConstraintSegment(segment);


        // CONSTRAINT SHAPE INSERTION / DELETION
        // insert a shape in mesh (a crossed square)
        var shape = mesh.insertConstraintShape( [ 50.0,  50.0, 100.0,  50.0 /* 1st segment with end points (50, 50) and (100, 50)       */
												,100.0,  50.0, 100.0, 100.0 /* 2nd segment with end points (100, 50) and (100, 100)     */
												,100.0, 100.0,  50.0, 100.0 /* 3rd segment with end points (100, 100) and (50, 100)     */
												, 50.0, 100.0,  50.0,  50.0 /* 4rd segment with end points (50, 100) and (50, 50)       */
												, 20.0,  50.0, 130.0, 100.0 /* 5rd segment with end points (20, 50) and (130, 100)      */
												] );
        // if you want to delete that shape
        //_mesh.deleteConstraintShape(shape);


        // OBJECT INSERTION / TRANSFORMATION / DELETION
        // insert an object in mesh (a cross)
        var objectCoords : Array<Float> = new Array<Float>();

        object = new Object();
        object.coordinates = 	[ -50.0,   0.0,  50.0,  0.0
								,   0.0, -50.0,   0.0, 50.0
								, -30.0, -30.0,  30.0, 30.0
								,  30.0, -30.0, -30.0, 30.0
                                ];
        mesh.insertObject( object );  // insert after coordinates are setted
        // you can transform objects with x, y, rotation, scaleX, scaleY, pivotX, pivotY
        object.x = 400;
        object.y = 200;
        object.scaleX = 2;
        object.scaleY = 2;
        // if you want to delete that object
        //_mesh.deleteObject(_object);

		targetCanvas.onEnterFrame = onEnterFrame;// animate
	}

    function onEnterFrame(): Void {
        object.rotation += 0.05; 		// objects can be transformed at any time
        mesh.updateObjects();  			// don't forget to update
        view.drawMesh( mesh, true ); 	// render mesh
    }
}
