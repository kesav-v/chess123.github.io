import java.util.Scanner;
import java.util.ArrayList;
import java.io.File;

public class AutoCorrect {

	ArrayList<String> words;

	public AutoCorrect() {
		words = new ArrayList<String>();
		Scanner in  = null;
		try {
			in = new Scanner(new File("wordlist.txt"));
		} catch (Exception e) {

		}
		while (in.hasNext()) {
			words.add(in.nextLine());
		}
		in.close();
	}

	public static void main(String[] args) {
		AutoCorrect ac = new AutoCorrect();
		String[] matches = ac.findClosest(args[0]);
		for (int i = 0; i < matches.length; i++) {
			System.out.println((i + 1) + ". " + matches[i]);
		}
	}

	public String[] findClosest(String word) {
		word = word.toLowerCase();
		int[] minDiff = new int[5];
		for (int i = 0; i < minDiff.length; i++) {
			minDiff[i] = 1000000000 + i;
		}
		String[] best = new String[minDiff.length];
		for (String s : words) {
			int diff = 0;
			diff += (s.length() - word.length()) * (s.length() - word.length()) * 20;
			if (diff > minDiff[minDiff.length - 1]) continue;
			int n = s.length();
			if (n > word.length()) n = word.length();
			for (int i = 0; i < n; i++) {
				diff += Math.abs(s.charAt(i) - word.charAt(i)) * Math.pow((n - i), 2);
				if (diff > minDiff[minDiff.length - 1]) continue;
			}
			for (int i = 0; i < minDiff.length; i++) {
				if (diff < minDiff[i]) {
					for (int j = minDiff.length - 1; j > i; j--) {
						minDiff[j] = minDiff[j - 1];
						best[j] = best[j - 1];
					}
					minDiff[i] = diff;
					best[i] = s;
					break;
				}
			}
		}
		return best;
	}

	public int binarySearch(String word) {
		return binarySearch(word, 0, words.size());
	}

	public int binarySearch(String word, int a, int b) {
		int middle = (a + b) / 2;
		String s = words.get(middle);
		// for ()
		return 0;
	}
}