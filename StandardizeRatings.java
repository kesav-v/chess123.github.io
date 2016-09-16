import java.util.ArrayList;
import java.util.Scanner;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;

public class StandardizeRatings {

	static ArrayList<Player> players = new ArrayList<Player>();

	public static void main(String[] args) {
		readData();
		sortByRating(players);
		standardize();
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

	public static void standardize() {
		double m = mean();
		double s = stdev();
		PrintWriter out = null;
		try {
			out = new PrintWriter(new File("normalprobplot.txt"));
		} catch (FileNotFoundException e) {
			System.err.println("ERROR: Could not find file");
			System.exit(1);
		}
		int count = 1;
		for (Player p : players) {
			out.println(p.getRating() + "\t" + normal(count));
			count++;
			// try {
			// 	Thread.sleep(20);
			// } catch (Exception e) {}
		}
		out.close();
	}

	public static double normal(double i) {
		double p1 = (i - 0.5) / players.size();
		if (p1 == 0.5) return 0;
		double z = Math.sqrt(Math.abs(-2 * Math.log(p1 * Math.sqrt(2 * Math.PI))));
		if (p1 < 0.5) return -z;
		return z;
	}

	public static double mean() {
		double sum = 0;
		for (Player p : players) {
			sum += p.getRating();
		}
		return sum / players.size();
	}

	public static double stdev() {
		double mean = mean();
		double sqsum = 0;
		for (Player p : players) {
			sqsum += (p.getRating() - mean) * (p.getRating() - mean);
		}
		return Math.sqrt(sqsum / (players.size() - 1));
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
            if(a.get(left).compareTo(a.get(right)) < 0)
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