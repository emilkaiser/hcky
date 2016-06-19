var Hcky = (function () {

	function cm (feet) {
		return feet * 30.48;
	}

	var s = undefined;

	var inch;
	function inches(nr) {
		return nr * inch
	}
	var thin;
	var bold;
	var circledimension;
	var smallcircledimension;
	var spotdimension;
	var centerspotdimension;
	var width;
	var height;
	var tickred;
	var tickwhite;
	var behind_goal;
	var faceOffShort;
	var faceOffLong;
	var goalwidth;
	var goalheight;
	var creaseradius;

	var circleWidthLineDistanceRatio;
	var circleWidthFaceOffLineDistanceRatio;
	var positions = {};
	var colors = {
		blue: '#0038a8',
		lightblue: '#57b5e0',
		red: '#ce1126',
		white: '#fff',
		grey: '#b4babd'
	};
	var styles = {};

	function nhl() {
		// dimensions
		inch = 1/12;
		thin = inches(2);
		bold = 1;
		circledimension = 15;
		smallcircledimension = 10;
		spotdimension = 2;
		centerspotdimension = inches(6);
		width = 200;
		height = 85;
		cornerradius = 14;
		tickred = 1;
		tickwhite = 3;
		faceOffShort = 3;
		faceOffLong = 4;
		goalwidth = 6;
		goalheight = 3;
		creaseradius = 1.8;

		circleWidthLineDistanceRatio = 1 / 1;
		circleWidthFaceOffLineDistanceRatio = (1+inches(6)) / 2;

		positions = {
			circle_left_top: [31, 20.5],
			circle_left_bottom: [31, 64.5],
			circle_right_top: [width - 31, 20.5],
			circle_right_bottom: [width - 31, 64.5],
			blueline_left: 74/200 * width,
			blueline_right: 125/200 * width,
			redline_left: 11,
			redline_right: width - 11,
			spot_left_top: [75/200 * width + 5, 20.5],
			spot_left_bottom: [75/200 * width + 5, 64.5],
			spot_right_top: [125/200 * width - 5, 20.5],
			spot_right_bottom: [125/200 * width - 5, 64.5],
		};

		styles = {
			thinred: {"stroke-width": thin, stroke: colors.red},
			boldred: {"stroke-width": bold, stroke: colors.red},
			thinblue: {"stroke-width": thin, stroke: colors.blue},
			boldblue: {"stroke-width": bold, stroke: colors.blue},
			goal: {"stroke-width": thin, stroke: colors.grey}
		};

		common();

		s.polyline('0,28.5 11,33.5').stroke({ color: colors.red, width: thin });
		s.polyline('0,56.5 11,51.5').stroke({ color: colors.red, width: thin });
		s.polyline('200,28.5 189,33.5').stroke({ color: colors.red, width: thin });
		s.polyline('200,56.5 189,51.5').stroke({ color: colors.red, width: thin });

		// crease and goal
		crease().move(positions.redline_left + thin*1.5, height/2);
		goal().move(positions.redline_left - goalheight, height/2 - goalwidth/2);
		crease().rotate(180).move(positions.redline_right + thin*0.5, height/2);
		goal().rotate(180).move(positions.redline_right - goalheight + thin, height/2 - goalwidth/2);
	}


	function international() {
		// dimensions
		thin = 5;
		bold = 30;
		circledimension = 450;
		smallcircledimension = 300;
		spotdimension = 60;
		centerspotdimension = 15;
		width = 6100;
		height = 3000;
		cornerradius = 700;
		tickred = 50;
		tickwhite = 100;
		faceOffShort = 90;
		faceOffLong = 120;
		goalwidth = 183;
		goalheight = 90;
		creaseradius = 180;

		circleWidthLineDistanceRatio = 170 / 120;
		circleWidthFaceOffLineDistanceRatio = 45 / 60;

		positions = {
			circle_left_top: [1000, 800],
			circle_left_bottom: [1000, 2200],
			circle_right_top: [width - 1000, 800],
			circle_right_bottom: [width - 1000, 2200],
			blueline_left: 1/3 * width,
			blueline_right: 2/3 * width,
			redline_left: 400,
			redline_right: width - 400,
			spot_left_top: [1/3 * width + 150, 800],
			spot_left_bottom: [1/3 * width + 150, 2200],
			spot_right_top: [2/3 * width - 150, 800],
			spot_right_bottom: [2/3 * width - 150, 2200],
		};

		styles = {
			thinred: {"stroke-width": thin, stroke: colors.red},
			boldred: {"stroke-width": bold, stroke: colors.red},
			thinblue: {"stroke-width": thin, stroke: colors.blue},
			boldblue: {"stroke-width": bold, stroke: colors.blue},
			goal: {"stroke-width": thin, stroke: colors.grey}
		};

		common();

		// crease and goal
		internationalcrease().move(positions.redline_left + thin*1.5, height/2);
		goal().move(positions.redline_left - goalheight, height/2 - goalwidth/2);
		internationalcrease().rotate(180).move(positions.redline_right + thin*0.5, height/2);
		goal().rotate(180).move(positions.redline_right - goalheight + thin, height/2 - goalwidth/2);
	}

	function common() {
		// white ice
		var ice = s.rect(width, height).radius(cornerradius, cornerradius).fill(colors.white).move(0, 0);

		// neutral zone spots and circles
		neutralcircle().move(positions.circle_left_top[0], positions.circle_left_top[1]);
		spotlines().move(positions.circle_left_top[0], positions.circle_left_top[1]);
		neutralcircle().move(positions.circle_left_bottom[0], positions.circle_left_bottom[1]);
		spotlines().move(positions.circle_left_bottom[0], positions.circle_left_bottom[1]);
		neutralcircle().move(positions.circle_right_top[0], positions.circle_right_top[1]);
		spotlines().move(positions.circle_right_top[0], positions.circle_right_top[1]);
		neutralcircle().move(positions.circle_right_bottom[0], positions.circle_right_bottom[1]);
		spotlines().move(positions.circle_right_bottom[0], positions.circle_right_bottom[1]);

		// blue lines
		s.line(positions.blueline_left + bold/2, 0, positions.blueline_left + bold/2, height).attr(styles.boldblue);
		s.line(positions.blueline_right + bold/2, 0, positions.blueline_right + bold/2, height).attr(styles.boldblue);

		// red lines
		s.line(positions.redline_left + thin, 0, positions.redline_left + thin, height).attr(styles.thinred);
		s.line(positions.redline_right + thin, 0, positions.redline_right + thin, height).attr(styles.thinred);

		// official circle
		s.group().add(s.circle().radius(smallcircledimension).fill('none').attr(styles.thinred)).move(width/2, height);

		// center line
		s.line(width/2, 0, width/2, height).attr(styles.boldred);
		var y = 0;
		var paint = true;
		while (paint) {
			s.line(width/2, y+tickred, width/2, y+tickwhite).attr({"stroke-width": 0.8 * bold, stroke: colors.white});
			y = y+tickwhite;
			if (y > 100) {
				paint = false
			}
		}

		// center circle
		s.group().add(s.circle().radius(circledimension).fill('none').attr(styles.thinblue)).move(width/2, height/2);

		// center spot
		s.circle().radius(centerspotdimension).fill(colors.blue).move(width/2 - centerspotdimension, height/2 - centerspotdimension);

		// neutral zone spots
		spot().move(positions.spot_left_top[0], positions.spot_left_top[1]);
		spot().move(positions.spot_left_bottom[0], positions.spot_left_bottom[1]);
		spot().move(positions.spot_right_top[0], positions.spot_right_top[1]);
		spot().move(positions.spot_right_bottom[0], positions.spot_right_bottom[1]);
	}

	function spot() {
		var group = s.group();

		var clip = s.rect((spotdimension-thin-thin) * 0.7, spotdimension).move(-((spotdimension-thin-thin) * 0.7)/2, -spotdimension/2);

		group.add(s.circle().radius(spotdimension/2).fill('none').attr(styles.thinred));
		group.add(s.circle().radius(spotdimension/2).fill(colors.red).clipWith(clip));

		return group;
	}

	function spotlines() {
		var group = spot();

		var polyline = s.polyline([
			[0, 0],
			[0, faceOffShort - thin/2],
			[faceOffLong - thin/2, faceOffShort - thin/2]
		]).fill('none').attr(styles.thinred).hide();

		group.add(polyline.clone().show().rotate(180).move(faceOffShort*2, -circleWidthFaceOffLineDistanceRatio*spotdimension/2));
		group.add(polyline.clone().show().scale(-1, -1).move(faceOffShort*2, -circleWidthFaceOffLineDistanceRatio*spotdimension/2));
		group.add(polyline.clone().show().scale(1, -1).move(faceOffShort*2, -circleWidthFaceOffLineDistanceRatio*spotdimension/2));
		group.add(polyline.clone().show().scale(-1, 1).move(faceOffShort*2, -circleWidthFaceOffLineDistanceRatio*spotdimension/2));

		return group;
	}

	function neutralcircle() {
		var group = s.group();

		// circle
		group.add(s.circle().radius(circledimension).fill('none').attr(styles.thinred));

		// outer lines
		var line = s.line(0, 0, 0, spotdimension).attr(styles.thinred);
		group.add(line.move(-(circleWidthLineDistanceRatio*spotdimension + thin) , -(circledimension + spotdimension - thin)));
		group.add(line.clone().move(circleWidthLineDistanceRatio*spotdimension , -(circledimension + spotdimension - thin)));
		group.add(line.clone().move(-(circleWidthLineDistanceRatio*spotdimension + thin) , circledimension - thin));
		group.add(line.clone().move(circleWidthLineDistanceRatio*spotdimension , circledimension - thin));

		return group;
	}

	function crease() {
		var group = s.group();

		// round part of crease
		var circle = s.circle().radius(6).fill(colors.lightblue).attr({"stroke-width": thin, stroke: colors.red});
		var clip = s.rect(3, 8).move(4, -4);
		group.add(circle.clipWith(clip));

		// upper and lower border
		group.add(s.line(0, -4 + thin/2, 4 + inches(6), -4 + thin/2).attr(styles.thinred));
		group.add(s.line(0, 4 - thin/2, 4 + inches(6), 4 - thin/2).attr(styles.thinred));

		// fill color
		group.add(s.rect(4 + inch * 4, 8 - inch * 4).fill(colors.lightblue).move(0, -4 + thin));

		// small lines
		group.add(s.line(4, -4, 4, -3.3).attr(styles.thinred));
		group.add(s.line(4, 4, 4, 3.3).attr(styles.thinred));

		return group;
	}

	function internationalcrease() {
		var group = s.group();

		var polyline = s.polyline([
			[0, 0],
			[0, 0.15 - thin/2],
			[0.15 - thin/2, 0.15 - thin/2]
		]).fill('none').attr(styles.thinred).hide();

		var circle = s.circle().radius(creaseradius - thin*2).fill(colors.lightblue).attr({"stroke-width": thin, stroke: colors.red});
		var clip = s.rect(creaseradius*2, creaseradius*3).move(0, -creaseradius*3/2);

		group.add(circle.clipWith(clip));
		group.add(polyline.clone().show().rotate(180).move(-1.22, 1));
		group.add(polyline.clone().show().rotate(270).move(-1+0.15, 1.22));

		return group;
	}

	function goal() {
		var group = s.group();

		// structure
		var ice = s.rect(goalwidth, goalwidth).radius(goalwidth/3, goalwidth/3).fill('none').attr(styles.goal);
		var crossbar = s.rect(goalwidth*4/6, goalwidth*5/6).radius(goalwidth/4, goalwidth/4).fill('none').attr(styles.goal).move(goalwidth/4, goalwidth/12);

		var clip = s.rect(goalwidth*4/3, goalwidth*4/3).move(-goalwidth*5/6, -goalwidth/6);
		group.add(ice.clipWith(clip));
		group.add(crossbar.clipWith(clip.clone()));

		// back pipe
		group.add(s.line(0, goalwidth/2, goalwidth/3.75, goalwidth/2).attr(styles.goal))

		return group;
	}


	return function (selector) {

		s = SVG(selector);
		var methods = {
			clear: function () {
				s.clear();
			},
			rotate: function () {
				s.viewbox(0, 0, height, width);
				s.each(function () {
					this.transform({rotation: 90, cx: 0, cy: height}).dmove(-height, 0);
				});
				return methods;
			},
			nhl: function () {
				var body = document.getElementsByTagName('body')[0];
				body.className = body.className + " nhl";
				methods.clear();
				width = 200;
				height = 85;
				s.viewbox(0, 0, width, height);
				nhl();
				return methods;
			},
			international: function () {
				var body = document.getElementsByTagName('body')[0];
				body.className = body.className + " international";
				methods.clear();
				width = 6100;
				height = 3000;
				s.viewbox(0, 0, width, height);
				international();
				return methods;
			}
		};
		return methods;
	};

}());
