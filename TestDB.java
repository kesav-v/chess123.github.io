import java.util.ArrayList;
import java.util.Arrays;
import java.util.Scanner;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;

public class TestDB {

	static ArrayList<Player> players = new ArrayList<Player>();
	static PrintWriter pw;
	static ArrayList<String> prevWinners = new ArrayList<String>();
	static int minRating = 3000;

	public static void main(String[] args) {
		readData();
		sortByRating(players);
		pair(players);
	}

	public static void pair(ArrayList<Player> pls) {
		if (pw == null) {
			try {
				pw = new PrintWriter(new File("pairings.txt"));
			} catch (FileNotFoundException e) {
				System.err.println("ERROR: Could not find file pairings.txt");
				System.exit(1);
			}
		}
		if (pls.size() == 1) {
			String winr = pls.get(0).getName();
			if (prevWinners.indexOf(winr) == -1) {
				prevWinners.add(winr);
				System.out.println("\n" + pls.get(0).getName() + " is the winner!");
				if (pls.get(0).getRating() < minRating) {
					minRating = pls.get(0).getRating();
					System.out.println("\nNEW RECORD! A " + pls.get(0).getRating() + " has won the tournament.");
				}
			}
			pw.close();
		}
		else {
			ArrayList<Player> winners = new ArrayList<Player>();
			if (pls.size() % 2 == 1) {
				winners.add(pls.get(pls.size() - 1));
				pls.remove(pls.size() - 1);
			}
			int middle = (pls.size() + 1) / 2;
			for (int k = 0; k < middle; k++) {
				Player p1 = pls.get(k);
				Player p2 = pls.get(pls.size() - 1 - k);
				String str1 = p1.getName() + " (" + p1.getRating() + ")";
				String str2 = p2.getName() + " (" + p2.getRating() + ")";
				pw.print(str1);
				for (int i = 0; i < 50 - str1.length(); i++) {
					pw.print(" ");
				}
				pw.print(str2);
				for (int i = 0; i < 50 - str2.length(); i++) {
					pw.print(" ");
				}
				winners.add(pickWinner(p1, p2));
			}
			for (int i = 0; i < 118; i++) {
				pw.print("*");
			}
			pw.println();
			sortByRating(winners);
			pair(winners);
		}
	}

	private static Player pickWinner(Player p1, Player p2) {
		int r1 = p1.getRating();
		int r2 = p2.getRating();
		double chance = 1.0 / (1 + Math.pow(10, (r2 - r1) / 400));
		double score = 0;
		int games = 2;
		double lower = 0;
		if (chance > 1 - chance) lower = 1 - chance;
		else lower = chance;
		double draw = 1.5 * lower;
		double win = chance * (1 - draw);
		for (int i = 0; i < games; i++) {
			double d = Math.random();
			if (d < win) score++;
			else if (d < win + draw) score += 0.5;
		}
		if (score > games / 2) {
			pw.println(score + " - " + (games - score));
			return p1;
		}
		else if (score < games / 2) {
			pw.println(score + " - " + (games - score));
			return p2;
		}
		boolean drawing = true;
		while (drawing) {
			games++;
			double d = Math.random();
			if (d < win) {
				score++;
				pw.println(score + " - " + (games - score));
				return p1;
			}
			if (d >= win + draw) {
				pw.println(score + " - " + (games - score));
				return p2;
			}
			score += 0.5;
		}
		System.out.println("THIS SOMEHOW HAPPENED");
		return p1;
	}

	public static void readData() {
		Scanner input = null;
		try {
			input = new Scanner(new File("rating_lists/standard_rating_list.txt"));
		} catch (FileNotFoundException e) {
			System.err.println("ERROR: Could not find rating list");
			System.exit(1);
		}
		input.nextLine();
		int cnt = 0;
		while (input.hasNext()) {
			String info = input.nextLine();
			Player player = new Player();
			int[] indices = {0, 15, 76, 80, 84, 89, 94, 109, 115, 119, 122, 128, info.length()};
			int cnt1 = 0;
			String[] parts = new String[12];
			for (int i = 0; i < indices.length - 1; i++) {
				parts[cnt1] = info.substring(indices[i], indices[i + 1]).trim();
				cnt1++;
			}
			player.setId(Integer.parseInt(parts[0]));
			player.setName(parts[1]);
			player.setFederation(parts[2]);
			player.setRating(Integer.parseInt(parts[7]));
			players.add(player);
		}
	}

	public static void sortByRating(ArrayList<Player> a)
	{
		ArrayList<Player> tmp = new ArrayList<Player>();
		for (int i = 0; i < a.size(); i++) {
			tmp.add(new Player());
		}
		mergeSort(a, tmp,  0,  a.size() - 1);
	}


	private static void mergeSort(ArrayList<Player> a, ArrayList<Player> tmp, int left, int right)
	{
		if( left < right )
		{
			int center = (left + right) / 2;
			mergeSort(a, tmp, left, center);
			mergeSort(a, tmp, center + 1, right);
			merge(a, tmp, left, center + 1, right);
		}
	}


    private static void merge(ArrayList<Player> a, ArrayList<Player> tmp, int left, int right, int rightEnd )
    {
        int leftEnd = right - 1;
        int k = left;
        int num = rightEnd - left + 1;

        while(left <= leftEnd && right <= rightEnd)
            if(a.get(left).compareTo(a.get(right)) >= 0)
                tmp.set(k++, a.get(left++));
            else
                tmp.set(k++, a.get(right++));

        while(left <= leftEnd)    // Copy rest of first half
            tmp.set(k++, a.get(left++));

        while(right <= rightEnd)  // Copy rest of right half
            tmp.set(k++, a.get(right++));

        // Copy tmp back
        for(int i = 0; i < num; i++, rightEnd--)
            a.set(rightEnd, tmp.get(rightEnd));
    }
}