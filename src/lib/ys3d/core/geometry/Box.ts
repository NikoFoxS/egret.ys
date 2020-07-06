module ys3d {
	export class Box extends Geometry {
		public constructor(width, height, depth) {
			super();

			width = width || 1;
			height = height || 1;
			depth = depth || 1;

			// segments

			const widthSegments = 1;
			const heightSegments = 1;
			const depthSegments = 1;

			// buffers

			var indices = [];
			var vertices = [];
			var uvs = [];

			// helper variables

			var numberOfVertices = 0;
			var groupStart = 0;

			// build each side of the box geometry

			buildPlane('z', 'y', 'x', - 1, - 1, depth, height, width, depthSegments, heightSegments, 0); // px
			buildPlane('z', 'y', 'x', 1, - 1, depth, height, - width, depthSegments, heightSegments, 1); // nx
			buildPlane('x', 'z', 'y', 1, 1, width, depth, height, widthSegments, depthSegments, 2); // py
			buildPlane('x', 'z', 'y', 1, - 1, width, depth, - height, widthSegments, depthSegments, 3); // ny
			buildPlane('x', 'y', 'z', 1, - 1, width, height, depth, widthSegments, heightSegments, 4); // pz
			buildPlane('x', 'y', 'z', - 1, - 1, width, height, - depth, widthSegments, heightSegments, 5); // nz

			this._indices = indices;
			this._vertices = vertices;
			this._uvs = uvs;

			function buildPlane(u, v, w, udir, vdir, width, height, depth, gridX, gridY, materialIndex) {

				var segmentWidth = width / gridX;
				var segmentHeight = height / gridY;

				var widthHalf = width / 2;
				var heightHalf = height / 2;
				var depthHalf = depth / 2;

				var gridX1 = gridX + 1;
				var gridY1 = gridY + 1;

				var vertexCounter = 0;
				var groupCount = 0;

				var ix, iy;

				var vector = Vector3.create();

				// generate vertices, normals and uvs

				for (iy = 0; iy < gridY1; iy++) {

					var y = iy * segmentHeight - heightHalf;

					for (ix = 0; ix < gridX1; ix++) {

						var x = ix * segmentWidth - widthHalf;

						// set values to correct vector component

						vector[u] = x * udir;
						vector[v] = y * vdir;
						vector[w] = depthHalf;

						// now apply vector to vertex buffer

						vertices.push(vector.x, vector.y, vector.z);

						// set values to correct vector component

						vector[u] = 0;
						vector[v] = 0;
						vector[w] = depth > 0 ? 1 : - 1;

						// now apply vector to normal buffer

						// normals.push( vector.x, vector.y, vector.z );

						// uvs

						uvs.push(ix / gridX);
						uvs.push(1 - (iy / gridY));

						// counters

						vertexCounter += 1;

					}

				}

				// indices

				// 1. you need three indices to draw a single face
				// 2. a single segment consists of two faces
				// 3. so we need to generate six (2*3) indices per segment

				for (iy = 0; iy < gridY; iy++) {

					for (ix = 0; ix < gridX; ix++) {

						var a = numberOfVertices + ix + gridX1 * iy;
						var b = numberOfVertices + ix + gridX1 * (iy + 1);
						var c = numberOfVertices + (ix + 1) + gridX1 * (iy + 1);
						var d = numberOfVertices + (ix + 1) + gridX1 * iy;

						// faces

						indices.push(a, b, d);
						indices.push(b, c, d);

						// increase counter

						groupCount += 6;

					}

				}

				// add a group to the geometry. this will ensure multi material support

				// scope.addGroup( groupStart, groupCount, materialIndex );

				// calculate new start value for groups

				groupStart += groupCount;

				// update total number of vertices

				numberOfVertices += vertexCounter;

			}
		}

	}
}