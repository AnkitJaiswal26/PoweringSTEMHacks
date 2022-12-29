import { AccountBoxSharp } from "@mui/icons-material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { EHRContext } from "../../Context/EHRContext";
import styles from "./Research.module.css";

const Research = () => {
	const [researchId, setResearchId] = useState(null);

	const {
		currentAccount,
		setCurrentAccount,
		connectWallet,
		hasUserRecordAccessForResearch,
		fetchResearchById,
	} = useContext(EHRContext);

	const [research, setResearch] = useState({
		// orgAdd: "orgadd",
		// name: "Research Paper",
		// description:
		// 	"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets",
		// cid: "cid",
		// access: true,
	});

	const fetchData = useCallback(async (researchId) => {
		console.log("Hello");
		const data = await fetchResearchById(parseInt(researchId));
		if (data && currentAccount) {
			console.log(data);
			const access = await hasUserRecordAccessForResearch(
				currentAccount,
				researchId
			);
			setResearch({ ...data, access });
		} else {
			setResearch(null);
		}
	});

	const connect = useCallback(async () => {
		await connectWallet();
	});

	useEffect(() => {
		const researchId = window.location.pathname.split("/")[2];
		fetchData(researchId).catch((err) => console.log(err));

		setResearchId(window.location.pathname.split("/")[2]);
	}, []);

	return (
		<div className={styles.researchs_wrapper}>
			<Sidebar value="Researchs" />
			<div className={styles.main_wrapper}>
				<div className={styles.navBar}>
					<h3 className={styles.user}>Welcome Ankit Jaiswal!</h3>
					{currentAccount === "" ? (
						<button
							className={styles.connectButton}
							onClick={async (e) => {
								e.preventDefault();
								console.log("ehll");
								await connectWallet();
							}}
						>
							Connect Wallet
						</button>
					) : (
						<button
							className={styles.connectButton}
							onClick={(e) => setCurrentAccount("")}
						>
							Logout
						</button>
					)}
				</div>
				{research && (
					<div className={styles.content}>
						<div className={styles.researchContainer}>
							<div className={styles.researchDetailsContainer}>
								<h3 className={styles.researchName}>
									{research.name}
								</h3>
								<p className={styles.researchDescription}>
									{research.description}
								</p>
							</div>
							<div className={styles.researchImage}>
								<img
									src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgSFhUYGBgaGBgYGRocGhoaGBkYGBoaGhoYGBgcIy4lHB4rIRwYJzgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHxISHzUrISs0NzQ2NDQ0NDQ0NDQ0NDY0NDY0NDQ2NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIAKwBJgMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAABAwACBAUGB//EAD0QAAEDAwIDBgIIBQQCAwAAAAEAAhEDEiEEMQVBURMiYXGBkTKhBhRCUmKx0fAVU5LB4SNygqLS8RZDwv/EABkBAQEBAQEBAAAAAAAAAAAAAAABAgMEBf/EACkRAAICAQQBAwQCAwAAAAAAAAABAhESAyFBUTEEEyJxgZGhYfAywdH/2gAMAwEAAhEDEQA/APfBQuRUhas9FEaVeUAiFLFBBRlVVpSxRJRQlSUsUWUVSVJVsUFCUVVLFBlSVIQhLJQZRlVhEBBRZFVRSxQVEAVJSxQUVWVJSxQVFJUlLFAURlCUsURRRRLFFSqq6qligFAq0qpSxRWECFYqpVsUVIVSFYqpKtiipUVSVFRRoARAQBVgVws60EIoSjKWKIooolkoiiiKWKJKigUSxQZUlFRLFAlSVIUhLFElFCECEsUWUlUUSyUWlSVQoSqXEZKkpcqXIMRkqSqShchMRkqSl3oXKihyiTcgXoKHSglXKXKihiBVC5Vu8UFDCVQlVL0C9UUQlAqF6qXIWiEKIEqK2KGhyNyzh6teuVHWh0o3JN6PaJQodcjckNqg7FWvCtEodcjesxrtmLhPmrh4SiUOvRvWe9G5Si0aLlLlm7QTE5RuSiUaLlLlndUAySl/W2YF2+yKLZGqNlyErO2sDsrXJRaHShKSXqXKihyqSl3IXqUKGXKXJd6naK0KGShKpehclCi8oSqXIStUKLypKXchclChsoXJRcherRKGlyBclXoFyoLl6F6WXKtyUBt6hekl6F6UBpcokl6itAy/WHKvbP6ogKBbSXRlu+Qtqv6qrieauin2I9+RbC4GRhNe5x5oBGUYVJUU7LxRbcNiVeVJQUiuTk59U4vJEH81SUZRo0mkFrQpb5+6lylylMWgvYDug2k3opcpclMWhzCBkJgqLNcpcpgM0ae0U7VZrkJTAZmrtVO0WWVJVwGZq7RTtFllSUwGZp7RTtVmlSUwGZo7VTtVnlCVcSZj+1UNRZ1ExJmP7VDtEiUExGY/tEDUSZQKuBMxt6BelFVVxJmOL1UvSlITEZl7kUqFFcSZjLUQ1MO5bBBHglaMuc0k9f7JxZly3otapamPBHI7SoSOeEJkLhGFZpB28lZzIwUGQuEYVsIyNpCoyKAIgK8hSQoMisKQrYRAQWykIJkKhqN/zyVW4yJCkIh4S2alpdaJ9sYSiZF4UhQSs9as4F3KGg+uVUrDkPKkIBhI25KQUoZMtaiGqBhRFJ358wpsS30C1SEnWXMjbM+OR5LUzSk8xnxHmo6Suy2xdqlqd9VPNw90W6aTAc0npOdpUtdjcz2qjitLqEbkA+eUmtRIzI91pNMjszzkpjSp2Rice4/JSmzOcBa2MqwqQhm3l7jZEHbHzClFtghAhWcD4DwkJRaSN8KpBtloUI8kGMcB4easyjIMnyg9J/wjpBWylw6oImmBzCCtIlswniBmcA+p/Mp2k4uWfC1h33E7iFy9XSa15DCXNBwSIJ9FNJSa94a51gJguI29FqouN1sR5ZUdjU8be/7LB1hvhCyHiDoj9J91zaggkAyJTtHQvcGlwbP2jMD2VSjFXRPk3Rq+uH9+3JRusInx36LC8kEidlbTtucGyMkCScK1GrHybo6n8TxAYwSIwDMe6Q3V+HJZNTTLHlhIJBIJBwfIpQeiUWrRmmnR0262BEN9s5Q+t7+Pgs9fTPY1r3AQ8SM9PDkszX8lEovdGnktmdd3E3ltpOPIfmlfXDt4ysuloOe61jSTkwM7bpRjYnI35ZRKPhBuXk3nVk4Q+tnr+/JYbx1CsWG27MTEjYdMq0jNs1/XHbSY81QV4WIVpVXVh5rWKM5M6J1TvvH3VH6onx9VjeXABxaYdMHkYMGEo10UUMmdH6y7qoNU79lZNO15khhPddu0kDG48VR7XgSQ4c5IU+N0LZ0DrXdStY45UgCG4/Awn1JGT4rz7qhiZwfJUbqPxJhF8DJnarcRe51xMT0ED2GE2lxmo2Yec74B9ui4HaH73yU7T8R9lXCL2aCk1yd1/Eajty44nbl1gBKGudPxGQefXyXKL9u8fZVc49SihFcEc5Pk651LjLpJEiTk5MxJ64Psg7Vv3N3rt/lcmXeMIz4uVxQzZ1PrZiLtkWVnGYuMRkAmJwPfZckXcpQDnjY/v9UpDJnaqPeN2vE42IB+SFSq9k3BzesgjbzXIDnnBcfmmMpPMG6cxznOJWaS8m1b8HS+tPOR5kwSc9fdVOqd1/Y/JdXhHB3WH/WLC4ZAES26BJkcxK06jgItMVSXkgCS2M4kmfEri9eCdHRabfJ53607qUPrjs7+nXx8N0NVo3sOTOYx6iQeYwsrpBM3R0ESCu8XGXg5SUomga546+5UWQB3OVFqomdz2PEvqptZTBNQFsG7FoOYJdG64Y0W8O8xiQPjGZzgZ8cLjHiVW0i7Hl3nZ54xKsde/He/x6rwKMuGeyOrBeT0DOA1HNb3TGTIsdMgFsAQevPosruH1WPaHttMXRaItZ8Ric/ZnzK5tLV1tmvqHHIn80xum1DzIFQmCBJdtv7Y+S6R09V8j3odGulpRc4XtgB4BcDMtwTA2gkDwUZooDgHMcQYnvYIIuG0c8zslVdFqXCDeRkGS8C3BOBvy90z6nqZEPqACRs4nOCLiZyQPZdFp6naM+7p34ZfU8PcGF3dLgTdDswBJx4b9UWcKe5jXtaIIkkkZzjHLEKO0tebyah3mRIcXDJcDIdI6ygaTxPdcOZhgAw23a2PhMeqq0tStmiPV0r3TKavTvaGgzlowXA7kjA5BLq8Pe0B8YLQd2gguMCBMkdCmsqW7AAizwPc+GYV2agjaeZySdzOx8fZaWlqrozLW0nwxNNj2Q4OIJDvCNwQfTPqk9jPeuG+RORzk42W0153G+/r4KCoOnTl02WlpT5qzEteHhJ0cgmMZWxmpcGGncbSQ4t5GJ5LWHjw9gmCoVt6Tfk5LWS8HKICraD9k+xXZFVMDp5q4My9VdHNZeWFgY6Lg74TMgdY8Ul2kfyY/wDpP6LsJrNS4c588qe3XgnvX5OOynXAtAeB5FbtC+q269jngtLQHAkDoQtw1c+BUOpKy9K1TRpa1O0cYcKrP+GmT4Y/KVdvANR/IPu39V1DqT1TmcRdsTnr1/yjhJeCe7Hk4/8AAdT/ACvmz/yWmrwSqWNAow8E3OvZB6YnC6DteeqUeI/j+ajhNlWtFcHLZwDUn7H/AGZv/UrH6Pan+WP6mf8AkuiziMTk9efSP7K44l+I+x/RXGZPcj0cwfR7U/yx/Wz9U+r9HKtrbWEuzcC5kDpHeW3+J/i/so7iRiQ6fVRwmFqx6OHU4NXaYLBPQOaT8jhU/hdb7nzb+q6/1g9cncotrnquijLkw9VcHIHC638v5t/VadJwOo90OaGCCZMESOWF0frJ6pNTXO2Bjx5+ijg3six1kt2jmv4bWbiz5tz6SgdDqP5TvZaXv5k+qbS073C4d1v3nOtaPUrXt15Z0jqZbJM49RrmnvMc3zBHzSw8fvC6NfjGlp4dUfWdsQ0mz1ccH5p9TR09QHVKBDHBtzqTsQA0HunY4/PkjTju1saq/Bg0lB1QkATAneFFkZqwBIOD7KLm77RtRjymY3vIiGznOYgdV6ThXEKDaYB09zwHAvhuZ+EyTOPJeVbPPHrKVUkOnOAM/Z3O/ivPo1l8vBIK5Ue20v0jc+40qLA1ouDjOe9cABAODI8lrr8T1QZcwMLoba22Oo3JjZxXiaWvZTpANDrnyyrIBFkn4M4dtuu1wXjzABSfho7rHEAANaCe+Z3wvW8PKS+53lGKOjR47Wex1RlSQ0lju4B3gGhzcjwGVY8a1JcG3NaSLstEAl07ief5pOqqVjc9jWNpWfaw8uJ+KAD3SIGcrmVBY97w0sqdiO683tdu3EbjYxvhajLTfC/Bxkju/wAT1bcESB90NdyI232JQq/Sd7AC8slzrILHA3OAGc/hCXw3XuHY0nse572El7W9wOYO8HmcGQR4pLtS+nUfcwvpOqFgYxlzw9xgvdysAAn/AHBPg3vFfYzdG5/0mZ2nYVKTXPLgCBzLjfiRAwY3Vqep0lW4WOYWGx0CBcGmZt8bVbTVbG1W2ud2bjDW5cWloeGtHM5hVqUqLn067+48MNoe60hrtwWk7rHwXhNfRi+yz+E0nyaVYGATBg7BuMQRkkZ6LDX4RVb9kOyR3TOzrdvMQk8Q4nRa/s2sNQ2yHMtc24yAN955eK42n43qW1GsioIc2WWZx3gA085yu2nDUatP8mZRjyjovYW4cCD4iCg2oQtem4+XgsrUZY02lxFoba02teXfC4kjnkrqVtGyA+jQc4kG4OGBEZF5jqjk47SX/DnLT2tM4zKs/wCE609D7LZ2GpdgUw3Ycutv54VW8H1DtyBIHMDcEjl4FZc1y1+TlhLozBxCjqgWsfR58S542J3dyaHcvAhR3BGgw6qwZjr9oNO58Z8lFOHZVozfBgdWCH1mN1t1WgoNa2K7JMzDRAO+YyN/kkM4Zd8FWk//AJwfZayVX/pmvZmuDP8AWSdgq947u9sfNdD+CV4w1p8nD9/+wgeC6j+X7Ob4ePiPdM49ox7c+jAGD/2mB0LV/B6/8p3u3njr4FVHCK5/+p3Lm3n6q5w7X5DhPoz9ohctP8J1H8p/L7vP1Vf4TX/lO/688DmmUO1+SYT6E3IEA8gtH8Jr/wAp3/XrHXqoOE6j+WfdvMx16plDtfkmE+mZS3oSPXCHavHQ/Ira3hGoP2I83N8T18CieDVxuGDzdttvj9weiZx7RVpzfBg+tTg48Fak+5zWAiXEAScZO58FqdwwD461Fn/IE+yx6mpp6AvdUfUEjusbAPm52IWk7dRV/Y6R0ZeZLYfq9fR07iBFV4LcwezbmP8AkZgY6HK89xvXVarCHu2dcADDY2MNGJktxv7LqM+kemMNOnfONrROG8wfB39XgmVOKaUNIdpxAHMtObTmJ3mD6ldIxw3cXfex2bi41FpI8c/SmJub7+ErvmDSZTBgktaDJgEyCS7kDn0KbreJ6EsfGmtcWOLIAAl11gMHBEtn/b4rlt1I7NkOEw25pIzt3o64C46spNdEg1F7UO4fwepWaXU3MtBLcmCCN8GJnBlRccPiYLhLiT3ZmdtyfFRfOcZd/o9S149fs213ucZLiTAEnOBgDPgk1tU9oNOCaZgkQIvG2d1mquuaAb2yZMYjfco0qJ2YS8mQ1jiLXOxGObtoC1FttKzzxdOymp1Dh3XEz0IAmVpp6cklrXNL3MutBBNMhzB35xcQVjfo6z/9Sp3Bk3EY7sAQBvuMqunGKoDnl1n3IOKlMyO9mYK9FRSuzT1JPaj2Wi4u+oXzWYwMYGdkQHXEbvu38I2TXvD3toPaBcxrBY663JdMnZwXkKXCgXlp1DWACb3N7pMxaLSSXb48Cupwrh5ZVc0Pc8BsFxYWtALQ+4S6eQGwmTErM/bUXjLf6EUpNrY9PwSrULuyeHPl7y54gCkWlxBH3rjPlkLpaV8B1QkYrPDiNrXACR4TYfReT0usdSD3hje650glxltoLmOPQ9w8vzXN4hxhz2Pfe9j3PINNpIZYRMnO/LngcliMW+TUr4R6wcRc9tSppgX9q9zA5pi21jQx4nB2d7Li/SRtVnZB73Pe9hIBDQWZFzZGCuJw573hxa9zGMc0vDHlptIOWNHxOwduq7LKjdS9lOo97WMcKbKhFtUtd8LnFwySQATA3O67L4yvj9mK7B9HmiO1i9zWv7hwLg4Brp2BkmP9hU1r6lMiq97hXMmo0xdRtHddcMOltpx1XpeDaIy9z2tbg0rGfBFN3xDq65zs/gHRbW8Gp9gaDnPeHMc01HWuqkOJyXlu4nGNgFI+o+bv+oSTrY8bUrh1B7n1yC5zXWkSHnum8nl19F1qH0l1VU9nSNrgwmzuONsgF1zgB0wncDZQptqtYyrVDDc81OxNoaCO7kY7pwAt2g07mMcGaap3g4te40Z74xkOBA2wvT70GqaT6ujnGL7OWzW6+4PrOeymDc83Mw2bie4Z3zhbtXWqFnaU3PqEhpYLy24HnJOMElcbUfR/VOptFtS/vXzVbYfugCZON5VOE8UbQa+nVLy5rgO7LwLQAQDyXSoy+SS24SNKWOzOjWfe4UjUc14h5GSS3aCTiDsi/QhxeOzazAseILiSMmORCRX4zS7ZtISXuAIcA0iDJgumeRwl1uJuv7NhaLSL78d1wkWHmcH2WknwdFNM5OoL2OLIDTDrdu+AR/qPjYkxPmg91RweWMD3YbiAQSwOJzvFynF9XeS4A2MLg4kQXYnuHm0ic+S51fioaGvp3fFDgTHwZxHWV2erUdvJxlN352PT6Cu6WCox9O4GXOdDWkEANLsCTyXpdJookh7+9n43R0wJgDyXz1j6j6jqNTUENgPAfB7wAe0Ak8jC9d9F+NtfTZTeYeGgOuLRJiTjl7L52vqtq0doa29M6vCKp1DDUY+o1jwQ2XObUBBIJOTGZIXY0uncxoAe9xA3c8kmOqRpHMa0BpEcsz81WjxBj3vY26+iRdyHezg89l8+Wq23Xj6HS6W/kU7XOZVbRqvc11RxFENc83BmTcZgRIWSvx6k0VSa1WKLrHxf3XNMQOuUrifE6zHiqWsFKmXFxyX2ciADuvPabX/W65YbbS9wZEtJaZcLpnOAu+mr3ktqOM9dr/FWHU8e1dwY17f9S59GXPzTBuaX97DrTPmue/jTmgitU1N132HvsAHKbusr0Gp+jWla9tJ/aX1Zd8WJGTBjAWrjeiL6PZMIEWAXE7MI3IB5Bd16zT2SjX80TGb+V3XH8nhjxKs+oaTHVrHADvl5LZGS4kmAs2o1VZrjLXGwkFxEBzWyOY9ZXc1NGqztKj6jL3MAuGzbdiZAGFy62qmA6HNtFzvsu64+fqvRH1fVEalVttGSnxF4yDdAjJxnMx8lrrve+ncTkFpDQNzBz47pGpoB5bbAPTYW8zgb7K1Z5YBsdhvAjPNdY+ocmcHm9m9jRprWYuAP2hPXby3WKqJvBdJcbmujdrQAYHmswrOdyyfiOZx8Np/9rpO4XVcGveWUwWuEvLWyDzayZjyWNTUp7kWm2qSMLqbnWA4ZcGzOXADBjxVdVpXB0w4AugYA8gCYWkaNjC1wfcWxMBxDo/3AQmanUOfGMA+Xh1K8kpJ+TrGLiGlp3MaO64A7FwInykZUVDWcdwXeJdKiKUUaOea/ekOk9c3EeJO3utum1NO9twcRu/vfDkfCQBnfPSVgDLpBbDQTsMkjkkCpBMNHIyN4nr5Lw42jcU+Tr8Q4q57XTJae4GnNjcS2REgBYNFXeC+o3DgyBB2FwnIggxMJ1JmAIEZJnfNpCtT7oefwECOpiF0pKNF8s2cN1TRRex7Q8A3Ma9xbY97suAE3OxE4wfFbaWqBkhlpdfJB3aGvjyADmgf7QuLVqEi1sdTIgyIMz/ZadM82gOIyKo6xLRaPDM+5UnFcGkzU57nGu505Di0cu9Md0fhbCYyi7sHMLsBxg8gA4RbOcwSFzL3AscC7AcTJBzBGBtHh5roUOIgUwwtAJJcWiYkyPkS4/kq5ytUubKmhYY59N4c4mDTLZJmAKn/5B9graWo4vbLzl0ySe6QXRE8gYOEunViTjMATJGzwJA84TXsa2A509CwjnsP31K9Pvx3Rh7UdGlxZ7KRF772lp+Iyf9Q3A+gA8ZWDivEnvwXuLWkOAc4xc0QHAc5GY2yUH2Ha49ZPry8Up9rc4CxH1EYttJbmZW1RpGtq02kB9t7A1wtYe6LoBNu/ednfO6ZU+lOpcwUw8NAtALRDhaIEHyWE1ATBk/NBlVpmGx6QpL1WXmKv6Eo2UeOalrbe0cedxhzto3I8FyHtcSXBxBJJJkiS7dbXVG9QqF4PU+iR9VJKkg0ZKdMtIcIBGxG/oVOzJ33PMmT7rSW/hKHYnk2PWPyXZern0ZxMT2PItvJAxEmNoAAKQzRnmfRdZtI/hCuNNPMegUfqHJ+BijFpnPaS5zA8mBc4kuAAjBP7wkm9rrmgyPtRv6LtCmBvKgA81tygl5GK3EnXW0KdG0uNOoajSNg7vEEj1XW4NxOoH3vLWvJbYJDZJBOegwN43CwwOiLA0ziIXJ+3LZMijTtl/pRXvIeyXPuJfDmvbDgZiwn7QjK9rwvitJlGnT7RndYxvxCe60DPivBSPLn+5QLRuuU46bilfg6Rbi7PbafX6ak6pbVYHVHl7wXt+IknA6ZWH/5Kx73Uw1wAu7+C2BORHXkvKGmNp+cKrtOD9o/1LChprls25tnW4lxSm8PYO8Ig4O5kRBGRtsuN2jD3YIaG/dxI5R47KDSgYl3mTlUfpgeZ/fitxnGPH7Myk2Kq1yZAHMRJHLyQq1nPADiBH3f8q40/gD7oFhGzP+y2vURj4RjEq0AK7GDYYVbeuJ8CrNoNP2j5EgfJSXqnIqSQexjNzh6/qg4NG749Qg+g0Zu9TBVm0iNiP37rjLVbKEVOjgf+JURuf+4/wouWQEO0pBkGPXqlnSu2kH/kl6jXODrQGxJ5eSc1xPM7csfkujlGOysWWoB7OXT7sdOaj2vM4aJM7qrGXbzt1KW4eJUeoC76TzkR4ZyBnEgImlU5H/tKvpmC285Pjt7JzDkqZC2Z7avVuPxFEUnEybZ85WxCVcxbFMomcmZ3jCcymBtyOP1RDyiHlRzT4BYmd59Ek6afveU/3hPBRlZzXQMT2QSIIwIMz7RlVYCCSGt/5XCPHK2VqQJ/yR+SrQ0zTkjKuQFM1OJwPISPcJjNQDi7Ks9u2SMHZZfqwuEkmTmYP9lbl2KNjXj7w91YEfuFhawGI7vl/mVVlQz/AH5rOTJR0pUu8/dYe1PX9ym06x8NkyKarzbaIjbOfmlsYG7CPJVaVV26OTYGhyvS5+IWKo45EkeStQqHu+n91qEqkmRosXEGD1/srkEnMkev73/NTU/EVQvOPX+yktpMpDTb0Ku0dEo6cF10kHwMJjaIAuknzJI9lmwMaFHNVVYbeqtgFnghZ4Ik+AQa5LBLP3gqpoA9PUj9USVUmeQHkoBL9KOp8sfooKJAwfJF9UoqAqLugURLyogP/9k="
									alt="reserachImage"
								/>
								{research.access === true ? (
									<button className={styles.grantButton}>
										Remove Access
									</button>
								) : (
									<button className={styles.grantButton}>
										Grant Access
									</button>
								)}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Research;
