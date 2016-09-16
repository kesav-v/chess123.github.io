public class Player implements Comparable<Player> {
	private int id;
	private String name;
	private int rating;
	private String federation;

	public void setId(int id) {
		this.id = id;
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setRating(int rating) {
		this.rating = rating;
	}
	public void setFederation(String federation) {
		this.federation = federation;
	}

	public int getId() {
		return id;
	}
	public String getName() {
		return name;
	}
	public int getRating() {
		return rating;
	}
	public String getFederation() {
		return federation;
	}

	public int compareTo(Player pl2) {
		return rating - pl2.getRating();
	}
}