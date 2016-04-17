import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

public class ColorChanger extends JFrame {

	public ColorChanger() {
		super("Color Changer");
		getContentPane().add(new ColorPanel());
		setLocation(0, -100);
		setSize(5000, 5000);
		setVisible(true);
		setDefaultCloseOperation(EXIT_ON_CLOSE);
	}

	public static void main(String[] args) {
		ColorChanger cc = new ColorChanger();
	}
}

class ColorPanel extends JPanel {

	Timer red, green, blue;
	int r, g, b;
	boolean rinc, ginc, binc;

	public ColorPanel() {
		setBackground(Color.GREEN);
		r = (int)(Math.random() * 254) + 1;
		g = (int)(Math.random() * 254) + 1;
		b = (int)(Math.random() * 254) + 1;
		red = new Timer((int)(Math.random() * 20) + 5, new ChangeRed());
		green = new Timer((int)(Math.random() * 20) + 5, new ChangeGreen());
		blue = new Timer((int)(Math.random() * 20) + 5, new ChangeBlue());
		rinc = ginc = binc = true;
		red.start();
		green.start();
		blue.start();
	}

	public void paintComponent(Graphics gr) {
		super.paintComponent(gr);
	}

	private class ChangeRed implements ActionListener {
		public void actionPerformed(ActionEvent e) {
			if (rinc) r++;
			else r--;
			if (r == 255 || r == 0) rinc = !rinc;
			setBackground(new Color(r, g, b));
			red.setDelay((int)(Math.random() * 20) + 5);
		}
	}
	private class ChangeGreen implements ActionListener {
		public void actionPerformed(ActionEvent e) {
			if (ginc) g++;
			else g--;
			if (g == 255 || g == 0) ginc = !ginc;
			setBackground(new Color(r, g, b));
			green.setDelay((int)(Math.random() * 20) + 5);
		}
	}
	private class ChangeBlue implements ActionListener {
		public void actionPerformed(ActionEvent e) {
			if (binc) b++;
			else b--;
			if (b == 255 || b == 0) binc = !binc;
			setBackground(new Color(r, g, b));
			blue.setDelay((int)(Math.random() * 20) + 5);
		}
	}
}