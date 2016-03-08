import java.io.*;
import java.util.Scanner;

public class CreatePage {
	public static void main(String[] args) {
		PrintWriter pw = null;
		Scanner kb = new Scanner(System.in);
		System.out.print("Enter the name of the new page -> ");
		String str = kb.nextLine();
		try {
			pw = new PrintWriter(new File(str));
		}
		catch (Exception e) {
			System.exit(0);
		}
		Scanner scan = null;
		try {
			scan = new Scanner(new File("template.html"));
		}
		catch (Exception e) {
			System.exit(0);
		}
		String text = "";
		while (scan.hasNext()) {
			text += scan.nextLine() + "\n";
		}
		pw.print(text);
		System.out.println("Successfully created page.")
		pw.close();
	}
}