import java.util.ArrayList;
import java.util.Arrays;
import java.util.Scanner;
import java.io.File;
import java.io.FileNotFoundException;

public class TestDB {

	static ArrayList<String> names = new ArrayList<String>();
	static ArrayList<Integer> ratings = new ArrayList<Integer>();
	static ArrayList<Integer> ids = new ArrayList<Integer>();

	public static void main(String[] args) {
		readData();
		for (int i = 0; i < ratings.size(); i++) {
			System.out.println(names.get(i) + "\t\t" + ratings.get(i));
		}
	}

	public static void readData() {
		Scanner input = null;
		try {
			input = new Scanner(new File("rating_lists/standard_rating_list_xml.xml"));
		} catch (FileNotFoundException e) {
			System.err.println("ERROR: Could not find rating list");
			System.exit(1);
		}
		input.nextLine();
		int cnt = 0;
		while (input.hasNext()) {
			String info = input.nextLine();
			if (info.equals("</player>")) continue;
			if (info.equals("<player>")) cnt++;
			if (info.indexOf("<name>") != -1) {
				names.add(info.substring(info.indexOf(">") + 1, info.lastIndexOf("<")));
			}
			if (info.indexOf("<rating>") != -1) {
				ratings.add(Integer.parseInt(info.substring(info.indexOf(">") + 1, info.lastIndexOf("<"))));
			}
			if (info.indexOf("<fideid>") != -1) {
				ids.add(Integer.parseInt(info.substring(info.indexOf(">") + 1, info.lastIndexOf("<"))));
			}
		}
	}
}